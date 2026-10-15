export interface Point {
  x: number;
  y: number;
  z?: number;
  // MediaPipe pose landmarks expose a per-point visibility ∈ [0,1]; below ~0.5
  // the landmark is essentially a guess (occluded or out of frame).
  visibility?: number;
}

export interface AnchorPoint {
  center: Point;
  width: number;
  rotation: number;
  // Optional 0..1 opacity. Used by hand jewelry to fade when the hand turns
  // sideways and the finger/wrist would be edge-on to the camera; the necklace
  // path leaves this undefined and the renderer treats that as fully opaque.
  opacity?: number;
}

export interface EarringAnchors {
  left: Point;
  right: Point;
  faceWidth: number;
  faceHeight: number;
  // Head tilt around the screen-z axis (radians). Used to rotate earrings so
  // they stay anchored to the lobe when the head tilts.
  tilt: number;
  // Per-side opacity 0..1, derived from head yaw. The far-side earring fades
  // out as the face turns away (Google try-on style yaw-occlusion).
  leftOpacity: number;
  rightOpacity: number;
}

// Decomposed head pose (radians). Yaw = left/right (around y-axis),
// pitch = up/down (around x-axis), roll = tilt (around z-axis).
export interface HeadPose {
  yaw: number;
  pitch: number;
  roll: number;
}

export interface LandmarkResult {
  faceLandmarks: Point[][] | null;
  handLandmarks: Point[][] | null;
  poseLandmarks: Point[][] | null;
  // From MediaPipe's facialTransformationMatrixes — a 4x4 column-major rigid
  // transform from canonical face space to the runtime face. Decomposed lazily.
  headPose: HeadPose | null;
}
