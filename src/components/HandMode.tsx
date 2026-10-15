'use client';

import { useEffect, useRef, useState } from 'react';
import { JewelryItem } from '../types/jewelry';
import { LandmarkResult } from '../types/landmarks';
import { HAND_TONES } from '../lib/handAssets';
import { getRingAnchors, getBraceletAnchors } from '../lib/landmarkUtils';
import { drawJewelryOverlay } from '../lib/overlayRenderer';

interface HandModeProps {
  /** Override the bundled hand images (must supply 3: light, medium, dark). */
  handImageUrls?: [string, string, string];
  /** The currently-foregrounded ring or bracelet, if any. */
  item: JewelryItem | null;
  /** MediaPipe still-image detection — same one used by upload mode. */
  detectImage: (img: HTMLImageElement) => Promise<LandmarkResult | null>;
  setRunningMode: (mode: 'VIDEO' | 'IMAGE') => Promise<void>;
  isModelLoading: boolean;
}

// Slider value (0..100) → opacity for the upper (darker) tone layers.
// Layers stack light → medium → dark on the canvas; medium fades in
// over light from 0..50, then dark fades in over medium from 50..100.
// This shows a darker hand without globally dimming the lighter photo.
function pickToneOpacities(value: number): { medium: number; dark: number } {
  return {
    medium: Math.min(1, value / 50),
    dark: Math.max(0, (value - 50) / 50),
  };
}

// Per-item scaleFactor / offsets are tuned for live webcam framing where
// the hand fills most of the frame. The bundled hand photos have a wider
// crop (lots of background around the hand) so the same calibration
// renders the ring a little small and reads slightly low on the phalanx.
// These nudges live only in hand mode and don't affect webcam/upload.
const HAND_PHOTO_RING_SCALE = 1.35;
const HAND_PHOTO_RING_OFFSET_Y = -0.008;
const HAND_PHOTO_BRACELET_SCALE = 1.15;

export default function HandMode({
  handImageUrls,
  item,
  detectImage,
  setRunningMode,
  isModelLoading,
}: HandModeProps) {
  const [tone, setTone] = useState(50); // 0 = lightest, 100 = darkest
  const tones = handImageUrls || (HAND_TONES as readonly string[]);
  const opacities = pickToneOpacities(tone);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handImagesRef = useRef<{
    light: HTMLImageElement | null;
    medium: HTMLImageElement | null;
    dark: HTMLImageElement | null;
  }>({ light: null, medium: null, dark: null });
  const [imagesReady, setImagesReady] = useState(false);
  const [landmarks, setLandmarks] = useState<LandmarkResult | null>(null);
  const [jewelryImg, setJewelryImg] = useState<HTMLImageElement | null>(null);

  // Switch the shared MediaPipe instance to still-image mode while this
  // tab is active. Same pattern as UploadMode.
  useEffect(() => {
    setRunningMode('IMAGE').catch(() => {});
  }, [setRunningMode]);

  // Preload the three tone images. The tones are recolored versions of
  // the same hand pose, so detecting once on the lightest image gives
  // anchors that apply to all three layers.
  useEffect(() => {
    let cancelled = false;
    setImagesReady(false);
    const urls = [tones[0], tones[1], tones[2]];
    Promise.all(
      urls.map(
        (url) =>
          new Promise<HTMLImageElement | null>((resolve) => {
            if (!url) return resolve(null);
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = url;
          })
      )
    ).then((imgs) => {
      if (cancelled) return;
      handImagesRef.current = {
        light: imgs[0],
        medium: imgs[1],
        dark: imgs[2],
      };
      setImagesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [tones[0], tones[1], tones[2]]);

  // Run hand detection once images are ready and the model is loaded.
  // Uses the light image; landmarks are reused across all tone layers
  // since the underlying pose is identical.
  useEffect(() => {
    if (!imagesReady || isModelLoading) return;
    const ref = handImagesRef.current.light;
    if (!ref) return;
    let cancelled = false;
    (async () => {
      try {
        const result = await detectImage(ref);
        if (!cancelled) setLandmarks(result);
      } catch (err) {
        console.error('[HandMode] detection failed:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [imagesReady, isModelLoading, detectImage]);

  // Load the jewelry image whenever the active item changes.
  useEffect(() => {
    if (!item) {
      setJewelryImg(null);
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setJewelryImg(img);
    };
    img.src = item.imageUrl;
    return () => {
      cancelled = true;
    };
  }, [item?.id, item?.imageUrl]);

  // Composite the tone layers onto the canvas and draw the jewelry on
  // top using detected anchors. Re-runs whenever any input changes —
  // tone slider, selection, landmarks, image load.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { light, medium, dark } = handImagesRef.current;
    if (!light) return;

    const w = light.naturalWidth;
    const h = light.naturalHeight;
    if (!w || !h) return;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 1;
    ctx.drawImage(light, 0, 0, w, h);
    if (medium && opacities.medium > 0) {
      ctx.globalAlpha = opacities.medium;
      ctx.drawImage(medium, 0, 0, w, h);
    }
    if (dark && opacities.dark > 0) {
      ctx.globalAlpha = opacities.dark;
      ctx.drawImage(dark, 0, 0, w, h);
    }
    ctx.globalAlpha = 1;

    if (!item || !jewelryImg || !landmarks) return;
    const hand = landmarks.handLandmarks?.[0];
    if (!hand) return;

    const baseConfig = item.overlayConfig;
    const anchor =
      item.type === 'ring'
        ? getRingAnchors(
            hand,
            baseConfig.finger || 'ring',
            baseConfig.ringPosition || 'base'
          )
        : item.type === 'bracelet'
        ? getBraceletAnchors(hand, baseConfig.braceletStyle || 'bangle')
        : null;
    if (!anchor) return;

    const config =
      item.type === 'ring'
        ? {
            ...baseConfig,
            scaleFactor: baseConfig.scaleFactor * HAND_PHOTO_RING_SCALE,
            offsetY: baseConfig.offsetY + HAND_PHOTO_RING_OFFSET_Y,
          }
        : item.type === 'bracelet'
        ? {
            ...baseConfig,
            scaleFactor: baseConfig.scaleFactor * HAND_PHOTO_BRACELET_SCALE,
          }
        : baseConfig;

    drawJewelryOverlay(ctx, jewelryImg, anchor, config, w, h);
  }, [imagesReady, opacities.medium, opacities.dark, landmarks, item, jewelryImg]);

  return (
    <div className="bytive-preview">
      <div className="bytive-hand-wrap">
        <div className="bytive-hand-figure">
          <canvas ref={canvasRef} className="bytive-hand-canvas" />
        </div>

        <div className="bytive-tone-slider">
          <span className="bytive-tone-label">Darker</span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={tone}
            onChange={(e) => setTone(Number(e.target.value))}
            aria-label="Skin tone"
            style={{
              rotate: "180deg"
            }}
          />
          <span className="bytive-tone-label">Lighter</span>
        </div>
      </div>

      {/* <div className="bytive-tracking-pill">Tracking</div> */}
      {item && <div className="bytive-product-pill">{item.name}</div>}
    </div>
  );
}
