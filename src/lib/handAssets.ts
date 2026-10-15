import dark from '../assets/dark.webp';
import medium from '../assets/medium.webp';
import light from '../assets/light.webp';

// Indexed light → dark so a slider value 0 (top, "Lighter") shows the
// lightest image and value 100 (bottom, "Darker") shows the darkest.
export const HAND_TONES = [light, medium, dark] as const;

// Where the jewelry overlay sits on the hand image. Coordinates are
// normalized (0..1) relative to the rendered image's bounding box.
//   x — left-to-right
//   y — top-to-bottom
//   scale — overlay width relative to the image width
//
// Tuned against the bundled hand photos (back-of-hand pose, fingers up,
// ring-finger MCP knuckle near the upper-left third of the frame).
export const HAND_OVERLAY = {
  // Sits on the ring-finger proximal phalanx, just below the MCP knuckle.
  ring: { x: 0.42, y: 0.40, scale: 0.16 },
  // Wrist runs across the very bottom of the frame on these crops.
  bracelet: { x: 0.42, y: 0.95, scale: 0.6 },
} as const;
