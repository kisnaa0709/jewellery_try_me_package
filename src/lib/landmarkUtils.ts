import { Point, AnchorPoint, EarringAnchors, HeadPose } from '../types/landmarks';
import {
  NecklacePlacement,
  NECKLACE_PLACEMENT_OFFSET,
  EarringStyle,
  EARRING_LOBE_SHIFT,
  Finger,
  FINGER_MCP_INDEX,
  RingPosition,
  BraceletStyle,
  BRACELET_FOREARM_SHIFT,
  BRACELET_WIDTH_RATIO,
} from '../types/jewelry';

/** Euclidean distance between two normalized points (xy plane only). */
function dist2D(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** Smooth ramp from 0→1 over [edge0, edge1]. */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Map a placement → how far below the chin the necklace's TOP anchor sits,
// in units of face-height. Used by the face-only fallback when pose shoulders
// are unreliable. Calibrated against typical adult proportions:
//   chin → suprasternal notch ≈ 0.5 face-heights (princess sits here)
//   chin → shoulder (acromion) ≈ 1.0 face-heights
const FACE_FALLBACK_BELOW_CHIN: Record<NecklacePlacement, number> = {
  collar: 0.08, // 12–13" — flat at neck base
  choker: 0.15, // 14–16" — high on the neck
  princess: 0.30, // 17–19" — collarbone / suprasternal notch
  matinee: 0.55, // 20–24" — upper chest
  opera: 0.85, // 28–34" — mid-chest
  rope: 1.10, // 35"+ — past mid-chest
  lariat: 1.15, // open-end drop
  layered: 0.25, // multi-strand bib — top V crosses the neck base
  yPendant: 0.32, // pendant Y at upper sternum
};

// Necklace width is locked to face width × this factor. Tying width to the
// face keeps sizing stable as the user moves toward / away from the camera,
// regardless of how reliable the pose-shoulder signal is in any given frame.
const NECKLACE_WIDTH_PER_FACE_WIDTH = 1.25;

/** Image-space sort: ensure leftPt has the smaller x, rightPt the larger. */
function sortByX<T extends { x: number; y: number }>(
  a: T,
  b: T
): { left: T; right: T } {
  return a.x <= b.x ? { left: a, right: b } : { left: b, right: a };
}

/**
 * Get necklace anchor from face (chin) + pose (shoulders) landmarks.
 * Anchor = TOP of necklace; the renderer extends the image downward from here.
 *
 * Priority order:
 *   1. MediaPipe pose, if shoulders pass visibility + geometry checks.
 *   2. Face-only fallback (chin + face height) when pose is unreliable.
 *
 * The face-only fallback handles the case where pose latches onto over-ear
 * headphones / collars / scarves and reports "shoulders" above the chin —
 * without it, the necklace lands on the face instead of the chest.
 */
export function getNecklaceAnchors(
  faceLandmarks: Point[] | null,
  poseLandmarks: Point[] | null,
  placement: NecklacePlacement = 'princess'
): AnchorPoint | null {
  // Width is ALWAYS derived from face width — independent of pose. This keeps
  // the necklace stably sized as the user moves; pose-derived widths jitter
  // or fail outright when shoulders are clipped/occluded.
  if (!faceLandmarks || faceLandmarks.length <= 356) return null;

  const chin = faceLandmarks[152];
  const forehead = faceLandmarks[10];
  const leftEdge = faceLandmarks[127];
  const rightEdge = faceLandmarks[356];

  const faceDx = chin.x - forehead.x;
  const faceDy = chin.y - forehead.y;
  const faceHeight = Math.hypot(faceDx, faceDy);
  const faceWidth = Math.abs(rightEdge.x - leftEdge.x);
  if (faceHeight < 1e-6 || faceWidth < 1e-6) return null;

  const width = faceWidth * NECKLACE_WIDTH_PER_FACE_WIDTH;

  // Validate pose shoulders. Pose-LM 11 = anatomical left (HIGH image-x for a
  // forward-facing person), 12 = anatomical right (LOW image-x). We sort by
  // image x so `left` is always the one with smaller x — without this, dx is
  // negative and atan2 returns ≈ π, rotating the necklace 180° (upside down).
  if (poseLandmarks && poseLandmarks.length >= 13) {
    const a = poseLandmarks[11];
    const b = poseLandmarks[12];
    const av = a.visibility ?? 1;
    const bv = b.visibility ?? 1;
    if (av > 0.5 && bv > 0.5) {
      const sorted = sortByX(a, b);
      const left = sorted.left;
      const right = sorted.right;
      const shoulderMidY = (left.y + right.y) / 2;
      // Real shoulders sit ≥ 0.3 × faceHeight below the chin. Closer (or
      // above) means the model has latched onto something else (collar,
      // headphones) — discard and fall through to the face-only path.
      if (shoulderMidY - chin.y > faceHeight * 0.3) {
        const shoulderMidX = (left.x + right.x) / 2;
        const placementFactor = NECKLACE_PLACEMENT_OFFSET[placement];
        const centerY = chin.y + (shoulderMidY - chin.y) * placementFactor;
        const centerX = chin.x * 0.4 + shoulderMidX * 0.6;
        const rotation = Math.atan2(right.y - left.y, right.x - left.x);
        return { center: { x: centerX, y: centerY }, width, rotation };
      }
    }
  }

  // Face-only fallback. "Down" along face axis (handles head roll). Anchor
  // sits N face-heights below the chin along that axis so necklaces stay
  // aligned when the head tilts even without a pose signal.
  const downX = faceDx / faceHeight;
  const downY = faceDy / faceHeight;
  // Pitch compensation: when the head tilts back, image-space faceHeight
  // foreshortens (chin moves toward forehead in y) but faceWidth stays ~stable.
  // The neck base sits at a roughly fixed real-world distance from the chin,
  // so as faceHeight shrinks below its expected value (~1.45 × faceWidth on
  // adult faces), we add the missing distance back as extra drop. Without
  // this, the placement is correct only at one head pitch.
  const expectedFaceHeight = faceWidth * 1.45;
  const pitchExtra = Math.max(0, expectedFaceHeight - faceHeight);
  const drop = FACE_FALLBACK_BELOW_CHIN[placement] * faceHeight + pitchExtra;
  const centerX = chin.x + downX * drop;
  const centerY = chin.y + downY * drop;
  // Rotation = face roll. Right-axis = down rotated 90°; atan2 of that is
  // the roll angle, matching what an upright shoulder line would produce.
  const rotation = Math.atan2(-downX, downY);
  return { center: { x: centerX, y: centerY }, width, rotation };
}

/**
 * Get earring anchors at the ear-lobe area, plus head-tilt rotation so the
 * earrings rotate with the head.
 *
 * MediaPipe FaceLandmarker (478 pts), viewer-side convention (non-mirrored):
 *   234 = viewer-LEFT tragion  (subject's anatomical RIGHT ear)
 *   454 = viewer-RIGHT tragion (subject's anatomical LEFT ear)
 *   1   = nose tip
 *   10  = forehead top
 *   152 = chin tip
 *   127 / 356 = face silhouette edges
 *
 * Geometry pipeline:
 *   1. Build face-local axes (down = forehead→chin, lateral ⟂ down).
 *   2. Anchor each earring at its tragion + lobe shift (along face down) +
 *      small outward shift (along lateral) so it clears the silhouette.
 *   3. Yaw → per-ear opacity (far ear fades behind the head) + a foreshortening
 *      lerp that pulls the far anchor toward the nose, matching how a 3D
 *      earring projects onto the image plane as the head turns.
 *   4. Roll → tilt rotation. Prefer MediaPipe's facial-transform decomposition
 *      (stable in profile); fall back to the two-tragion atan2.
 */
export function getEarringAnchors(
  faceLandmarks: Point[] | null,
  earringStyle: EarringStyle = 'drop',
  headPose: HeadPose | null = null
): EarringAnchors | null {
  if (!faceLandmarks || faceLandmarks.length < 468) return null;

  const leftEar = faceLandmarks[234];
  const rightEar = faceLandmarks[454];
  const forehead = faceLandmarks[10];
  const chin = faceLandmarks[152];
  const noseTip = faceLandmarks[1];

  const leftEdge = faceLandmarks[127];
  const rightEdge = faceLandmarks[356];
  const faceWidth = Math.abs(rightEdge.x - leftEdge.x);
  const faceHeight = dist2D(forehead, chin);
  if (faceHeight < 1e-6 || faceWidth < 1e-6) return null;

  // Face-local axes. `down` is the unit vector from forehead toward chin;
  // `lateral` is `down` rotated 90° in-plane and points toward the subject's
  // anatomical LEFT (= viewer-right at zero roll). Using these instead of
  // raw image axes keeps the lobe and outward offsets correct under roll.
  const downX = (chin.x - forehead.x) / faceHeight;
  const downY = (chin.y - forehead.y) / faceHeight;
  const lateralX = downY;
  const lateralY = -downX;

  // Lobe sits below the tragion along the face axis. Per-style anchor offset
  // (negative values like climber/cuff anchor ABOVE the lobe — they sit on
  // the helix/cartilage rather than hanging from the lobe).
  const lobeShift = EARRING_LOBE_SHIFT[earringStyle] ?? 0.06;
  const lobeDownX = downX * faceHeight * lobeShift;
  const lobeDownY = downY * faceHeight * lobeShift;

  // Outward nudge keeps the earring just past the cheek silhouette.
  const outward = faceWidth * 0.015;

  // ─── Yaw-aware occlusion ──────────────────────────────────────────────
  // Sign convention (matches MediaPipe's facialTransformationMatrix decomp):
  //   yawSigned < 0 → face turned toward viewer-LEFT → leftEar (viewer-left,
  //                   subject-right) is the FAR/occluded ear.
  //   yawSigned > 0 → face turned toward viewer-RIGHT → rightEar is far.
  // Prefer the matrix yaw (signed, robust to facial proportions); fall back
  // to a nose-vs-ears heuristic when the matrix is unavailable.
  let yawSigned: number;
  let turnMag: number;
  if (headPose && Number.isFinite(headPose.yaw)) {
    yawSigned = headPose.yaw;
    // ~25° (0.44 rad): far ear is fully behind the silhouette by this angle.
    turnMag = Math.min(1, Math.abs(yawSigned) / 0.44);
  } else {
    const earSpanX = rightEar.x - leftEar.x || 1e-6;
    yawSigned = (noseTip.x - leftEar.x) / earSpanX - 0.5;
    turnMag = Math.min(1, Math.abs(yawSigned) / 0.30);
  }

  const farFade = 1 - smoothstep(0.35, 0.85, turnMag);
  const leftIsFar = yawSigned < 0;
  const leftOpacity = leftIsFar ? farFade : 1;
  const rightOpacity = leftIsFar ? 1 : farFade;

  // Foreshortening: the far ear's projected x slides toward the nose as the
  // head rotates. Lerping the far anchor toward the nose keeps the (already
  // faded) earring sliding off the silhouette instead of floating off-cheek.
  const inwardPull = 0.55 * turnMag; // 0 head-on, ~0.55 near profile
  const leftPull = leftIsFar ? inwardPull : 0;
  const rightPull = leftIsFar ? 0 : inwardPull;

  // Tilt: prefer matrix roll. The two-tragion atan2 collapses near profile
  // (the connecting line shrinks toward zero, amplifying noise into rotation).
  const tilt =
    headPose && Number.isFinite(headPose.roll)
      ? headPose.roll
      : Math.atan2(rightEar.y - leftEar.y, rightEar.x - leftEar.x);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  return {
    left: {
      x: lerp(leftEar.x, noseTip.x, leftPull) - lateralX * outward + lobeDownX,
      y: lerp(leftEar.y, noseTip.y, leftPull) - lateralY * outward + lobeDownY,
    },
    right: {
      x: lerp(rightEar.x, noseTip.x, rightPull) + lateralX * outward + lobeDownX,
      y: lerp(rightEar.y, noseTip.y, rightPull) + lateralY * outward + lobeDownY,
    },
    faceWidth,
    faceHeight,
    tilt,
    leftOpacity,
    rightOpacity,
  };
}

/**
 * Get ring anchor from hand landmarks.
 *
 * MediaPipe Hand Landmarker:
 *   13 = ring finger MCP (knuckle), 14 = ring finger PIP (first joint)
 *
 * Anchor sits at the BASE of the proximal phalanx (~25% from MCP toward PIP).
 * Real rings rest just past the knuckle, not in the middle of the finger
 * segment — biasing this toward MCP keeps the ring tucked against the hand.
 *
 * Width is estimated from the inter-knuckle distance, foreshortened via the
 * 2D/3D palm-diagonal ratio so the ring shrinks when the hand turns sideways.
 *
 * Opacity fades as the hand turns edge-on (palm 2D/3D ratio drops). At a
 * steep angle the finger is mostly behind itself and a fully opaque ring
 * would float in mid-air; fading hides the geometric impossibility.
 */
export function getRingAnchors(
  handLandmarks: Point[] | null,
  finger: Finger = 'ring',
  position: RingPosition = 'base'
): AnchorPoint | null {
  if (!handLandmarks || handLandmarks.length < 21) return null;

  const mcpIdx = FINGER_MCP_INDEX[finger];
  const pipIdx = mcpIdx + 1;
  const dipIdx = mcpIdx + 2;
  const tipIdx = mcpIdx + 3;
  // Thumb has only 3 segments — clamp to landmarks that exist.
  const lastIdx = handLandmarks.length - 1;
  const safe = (i: number) => handLandmarks[Math.min(i, lastIdx)];

  // Pick the segment + interpolation t based on `position`. base/mid live on
  // the proximal phalanx (MCP→PIP); midi between PIP→DIP; tip between DIP→TIP.
  let p0: Point, p1: Point, t: number;
  switch (position) {
    case 'base':
      p0 = safe(mcpIdx);
      p1 = safe(pipIdx);
      t = 0.25;
      break;
    case 'mid':
      p0 = safe(mcpIdx);
      p1 = safe(pipIdx);
      t = 0.55;
      break;
    case 'midi':
      p0 = safe(pipIdx);
      p1 = safe(dipIdx);
      t = 0.5;
      break;
    case 'tip':
      p0 = safe(dipIdx);
      p1 = safe(tipIdx);
      t = 0.5;
      break;
  }

  const center: Point = {
    x: p0.x + (p1.x - p0.x) * t,
    y: p0.y + (p1.y - p0.y) * t,
    z: (p0.z ?? 0) + ((p1.z ?? 0) - (p0.z ?? 0)) * t,
  };

  const indexBase = handLandmarks[5];
  const pinkyBase = handLandmarks[17];
  const palmDiag3D = Math.hypot(
    indexBase.x - pinkyBase.x,
    indexBase.y - pinkyBase.y,
    (indexBase.z ?? 0) - (pinkyBase.z ?? 0)
  );
  const palmDiag2D = dist2D(indexBase, pinkyBase);
  // 1 = palm fully facing camera, 0 = edge-on.
  const handFacing = palmDiag3D > 1e-6 ? palmDiag2D / palmDiag3D : 1;

  // Finger diameter ≈ the gap to the closest neighbor MCP. Use 3D distance so
  // it stays stable when the hand turns; we re-foreshorten via handFacing.
  const mcp = safe(mcpIdx);
  let fingerWidth: number;
  if (finger === 'ring') {
    const mid = handLandmarks[9];
    const a3D = Math.hypot(mid.x - mcp.x, mid.y - mcp.y, (mid.z ?? 0) - (mcp.z ?? 0));
    const b3D = Math.hypot(mcp.x - pinkyBase.x, mcp.y - pinkyBase.y, (mcp.z ?? 0) - (pinkyBase.z ?? 0));
    fingerWidth = (a3D + b3D) / 2;
  } else if (finger === 'thumb') {
    // Thumb is wider than the other fingers but has no inter-MCP neighbor on
    // the radial side, so use the index MCP as the reference.
    fingerWidth = Math.hypot(
      indexBase.x - mcp.x,
      indexBase.y - mcp.y,
      (indexBase.z ?? 0) - (mcp.z ?? 0)
    ) * 0.6; // thumbs are thicker — bump the implied diameter up vs. inter-MCP gap
  } else {
    const neighborIdx = finger === 'pinky' ? 13 : mcpIdx + 4; // ring on its medial side, others on lateral
    const neighbor = handLandmarks[Math.max(2, Math.min(neighborIdx, lastIdx))];
    fingerWidth = Math.hypot(
      neighbor.x - mcp.x,
      neighbor.y - mcp.y,
      (neighbor.z ?? 0) - (mcp.z ?? 0)
    );
  }
  // Phalanx narrows toward the tip — scale finger width down for midi/tip.
  const phalanxScale =
    position === 'midi' ? 0.85 : position === 'tip' ? 0.72 : 0.78;
  fingerWidth *= phalanxScale;
  fingerWidth *= handFacing;

  // Ring sits perpendicular to the finger axis at the chosen segment.
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const rotation = Math.atan2(dy, dx) - Math.PI / 2;

  // Opacity: full when hand-facing > 0.7, ramps to 0 at 0.25.
  const opacity = smoothstep(0.25, 0.7, handFacing);

  return { center, width: fingerWidth, rotation, opacity };
}

/**
 * Get bracelet anchor at the wrist.
 *
 * MediaPipe Hand Landmarker:
 *   0 = wrist (between hand and forearm)
 *   5 = index MCP, 17 = pinky MCP
 *
 * Wrist landmark sits at the wrist crease on the palm side. Bracelets actually
 * rest above the crease, on the forearm side of the wrist bone — we shift the
 * anchor away from the palm by ~22% of hand length (was 15%, which sat right
 * on the crease and looked too low).
 *
 * Width: the wrist is ≈ 70% of palm width (index MCP ↔ pinky MCP). Foreshorten
 * via the 2D/3D ratio so the bracelet shrinks when the wrist turns away.
 *
 * Opacity follows the hand-facing factor (same as the ring) — when the wrist
 * is edge-on to the camera the bracelet would be wrapping behind the arm and
 * any overlay disagrees with reality, so we fade it out.
 */
export function getBraceletAnchors(
  handLandmarks: Point[] | null,
  style: BraceletStyle = 'bangle'
): AnchorPoint | null {
  if (!handLandmarks || handLandmarks.length < 21) return null;

  const wrist = handLandmarks[0];
  const indexBase = handLandmarks[5];
  const pinkyBase = handLandmarks[17];

  const palmWidth2D = dist2D(indexBase, pinkyBase);
  const palmWidth3D = Math.hypot(
    indexBase.x - pinkyBase.x,
    indexBase.y - pinkyBase.y,
    (indexBase.z ?? 0) - (pinkyBase.z ?? 0)
  );
  const handFacing = palmWidth3D > 1e-6 ? palmWidth2D / palmWidth3D : 1;
  // Per-style width ratio — tighter for tennis, looser for cuff.
  const wristWidth = palmWidth3D * BRACELET_WIDTH_RATIO[style] * handFacing;

  // Hand "up" direction = wrist → middle of palm base.
  const palmCenterX = (indexBase.x + pinkyBase.x) / 2;
  const palmCenterY = (indexBase.y + pinkyBase.y) / 2;
  const handDx = palmCenterX - wrist.x;
  const handDy = palmCenterY - wrist.y;
  const handLen = Math.hypot(handDx, handDy) || 1;

  // Shift up the forearm by the per-style fraction. Watch sits on the
  // crease, bangle past the wrist bone, cuff well up the forearm.
  const forearmShift = BRACELET_FOREARM_SHIFT[style];
  const center: Point = {
    x: wrist.x - (handDx / handLen) * (handLen * forearmShift),
    y: wrist.y - (handDy / handLen) * (handLen * forearmShift),
  };

  // Bracelet sits perpendicular to the forearm axis.
  const rotation = Math.atan2(handDy, handDx) - Math.PI / 2;
  const opacity = smoothstep(0.25, 0.7, handFacing);

  return { center, width: wristWidth, rotation, opacity };
}
