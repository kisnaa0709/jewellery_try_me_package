import { AnchorPoint, EarringAnchors } from '../types/landmarks';
import { OverlayConfig } from '../types/jewelry';

// Soft contact shadow under jewelry. Canvas's built-in shadow respects PNG alpha
// so the shadow takes the jewelry's silhouette automatically.
const SHADOW_COLOR = 'rgba(0, 0, 0, 0.35)';
const SHADOW_BLUR = 6;
const SHADOW_OFFSET_Y = 4;

function applyShadow(ctx: CanvasRenderingContext2D, offsetY = SHADOW_OFFSET_Y) {
  ctx.shadowColor = SHADOW_COLOR;
  ctx.shadowBlur = SHADOW_BLUR;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = offsetY;
}

/**
 * Draw jewelry centered on the anchor point.
 * Used for rings and bracelets.
 */
export function drawJewelryOverlay(
  ctx: CanvasRenderingContext2D,
  jewelryImage: HTMLImageElement,
  anchor: AnchorPoint,
  config: OverlayConfig,
  canvasWidth: number,
  canvasHeight: number
) {
  const { center, width, rotation, opacity } = anchor;
  // Hand jewelry sets opacity ∈ [0,1] to fade as the hand turns sideways.
  // Skip the draw entirely once it's near zero — saves a noisy ghost render.
  const handAlpha = opacity ?? 1;
  if (handAlpha <= 0.02) return;

  const px = center.x * canvasWidth;
  const py = center.y * canvasHeight;

  const drawWidth = width * canvasWidth * config.scaleFactor;
  const aspectRatio = jewelryImage.height / jewelryImage.width;
  const drawHeight = drawWidth * aspectRatio;

  const offsetPx = config.offsetX * canvasWidth;
  const offsetPy = config.offsetY * canvasHeight;

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.globalAlpha = 0.97 * handAlpha;
  applyShadow(ctx);
  ctx.translate(px + offsetPx, py + offsetPy);
  ctx.rotate(rotation);
  ctx.drawImage(
    jewelryImage,
    -drawWidth / 2,
    -drawHeight / 2,
    drawWidth,
    drawHeight
  );
  ctx.restore();
}

/**
 * Draw necklace overlay.
 * Necklace images are U-shaped with the open/chain end at top.
 * The anchor point = neckline. We draw the image so its top edge
 * aligns with the neckline, hanging downward onto the chest.
 */
export function drawNecklaceOverlay(
  ctx: CanvasRenderingContext2D,
  jewelryImage: HTMLImageElement,
  anchor: AnchorPoint,
  config: OverlayConfig,
  canvasWidth: number,
  canvasHeight: number
) {
  const { center, width, rotation } = anchor;

  const px = center.x * canvasWidth;
  const py = center.y * canvasHeight;

  const drawWidth = width * canvasWidth * config.scaleFactor;
  const aspectRatio = jewelryImage.height / jewelryImage.width;
  const drawHeight = drawWidth * aspectRatio;

  const offsetPx = config.offsetX * canvasWidth;
  const offsetPy = config.offsetY * canvasHeight;

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.globalAlpha = 0.96;
  applyShadow(ctx);
  ctx.translate(px + offsetPx, py + offsetPy);
  ctx.rotate(rotation);
  // Image is U-shaped with the chain ends at its top. Anchor is the neckline,
  // so draw the image with its top edge AT the anchor (y=0) extending down
  // (y=+drawHeight) — chain rests on the neck, pendant hangs onto the chest.
  ctx.drawImage(
    jewelryImage,
    -drawWidth / 2,
    0,
    drawWidth,
    drawHeight
  );
  ctx.restore();
}

/**
 * Draw earrings on both ears.
 *
 * Each earring is rotated around its own lobe anchor by the head-tilt angle
 * so it stays pinned to the ear when the head tilts. The image hangs from
 * its top edge (the post/hook) — this is the natural pivot for an earring.
 */
export function drawEarringOverlay(
  ctx: CanvasRenderingContext2D,
  jewelryImage: HTMLImageElement,
  anchors: EarringAnchors,
  config: OverlayConfig,
  canvasWidth: number,
  canvasHeight: number
) {
  const earringWidth = anchors.faceWidth * canvasWidth * config.scaleFactor;
  const aspectRatio = jewelryImage.height / jewelryImage.width;
  const earringHeight = earringWidth * aspectRatio;

  const offsetPx = config.offsetX * canvasWidth;
  const offsetPy = config.offsetY * canvasHeight;

  const tilt = anchors.tilt;

  // Per-side opacity for yaw-aware occlusion (Google try-on style). When the
  // head turns away from the camera, the far-side earring fades behind the
  // head silhouette instead of floating in space.
  const drawOne = (
    cx: number,
    cy: number,
    flip: boolean,
    alpha: number
  ) => {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.globalAlpha = 0.97 * alpha;
    applyShadow(ctx);
    ctx.translate(cx, cy);
    ctx.rotate(tilt);
    if (flip) ctx.scale(-1, 1);
    // Subtle horizontal squish on the far-fading side fakes perspective —
    // the closer the ear is to the silhouette edge the more it foreshortens.
    const squish = 0.6 + 0.4 * alpha;
    ctx.scale(squish, 1);
    ctx.drawImage(
      jewelryImage,
      -earringWidth / 2,
      0,
      earringWidth,
      earringHeight
    );
    ctx.restore();
  };

  drawOne(
    anchors.left.x * canvasWidth + offsetPx,
    anchors.left.y * canvasHeight + offsetPy,
    false,
    anchors.leftOpacity
  );
  drawOne(
    anchors.right.x * canvasWidth - offsetPx,
    anchors.right.y * canvasHeight + offsetPy,
    true,
    anchors.rightOpacity
  );
}
