'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { JewelryItem, JewelryType } from '../types/jewelry';
import { LandmarkResult, AnchorPoint, EarringAnchors } from '../types/landmarks';
import {
  getNecklaceAnchors,
  getEarringAnchors,
  getRingAnchors,
  getBraceletAnchors,
} from '../lib/landmarkUtils';
import {
  drawJewelryOverlay,
  drawNecklaceOverlay,
  drawEarringOverlay,
} from '../lib/overlayRenderer';

export interface NudgeOffset {
  x: number;
  y: number;
}

interface UseJewelryOverlayReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  selectedItems: Map<JewelryType, JewelryItem>;
  toggleJewelry: (item: JewelryItem) => void;
  removeJewelry: (type: JewelryType) => void;
  clearAll: () => void;
  hasAnySelected: boolean;
  sizeMultipliers: Map<string, number>;
  setSize: (itemId: string, multiplier: number) => void;
  nudgeOffsets: Map<string, NudgeOffset>;
  nudge: (itemId: string, dx: number, dy: number) => void;
  resetNudge: (itemId: string) => void;
  // Bumps every time a jewelry image finishes loading. Static modes
  // (upload) include this in their effect deps so they redraw once the
  // newly-selected item's image is actually available.
  imagesLoadVersion: number;
  renderFrame: (
    source: HTMLVideoElement | HTMLImageElement,
    landmarks: LandmarkResult | null,
    mirror: boolean
  ) => void;
}

export const SIZE_MIN = 0.5;
export const SIZE_MAX = 1.6;
export const SIZE_STEP = 0.1;

// Per-step nudge in normalized canvas units (1 unit = full canvas dimension).
export const NUDGE_STEP = 0.005;

// EMA smoothing strength (per anchor field). Lower = smoother but more lag.
// 0.45 ≈ 3-frame settle at 60fps; cuts most jitter without visible drag.
const SMOOTH_ALPHA = 0.45;

function ema(prev: number | undefined, next: number, alpha = SMOOTH_ALPHA) {
  if (prev === undefined || !Number.isFinite(prev)) return next;
  return prev + (next - prev) * alpha;
}

// Angles need wrap-aware blending so a step from +π to −π doesn't flicker.
function emaAngle(prev: number | undefined, next: number, alpha = SMOOTH_ALPHA) {
  if (prev === undefined || !Number.isFinite(prev)) return next;
  let diff = next - prev;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  while (diff < -Math.PI) diff += 2 * Math.PI;
  return prev + diff * alpha;
}

function smoothAnchor(
  cache: Map<string, AnchorPoint>,
  key: string,
  fresh: AnchorPoint
): AnchorPoint {
  const prev = cache.get(key);
  const smoothed: AnchorPoint = {
    center: {
      x: ema(prev?.center.x, fresh.center.x),
      y: ema(prev?.center.y, fresh.center.y),
      z: fresh.center.z,
    },
    width: ema(prev?.width, fresh.width),
    rotation: emaAngle(prev?.rotation, fresh.rotation),
    opacity:
      fresh.opacity !== undefined
        ? ema(prev?.opacity, fresh.opacity)
        : undefined,
  };
  cache.set(key, smoothed);
  return smoothed;
}

function smoothEarring(
  cache: Map<string, EarringAnchors>,
  key: string,
  fresh: EarringAnchors
): EarringAnchors {
  const prev = cache.get(key);
  const smoothed: EarringAnchors = {
    left: {
      x: ema(prev?.left.x, fresh.left.x),
      y: ema(prev?.left.y, fresh.left.y),
    },
    right: {
      x: ema(prev?.right.x, fresh.right.x),
      y: ema(prev?.right.y, fresh.right.y),
    },
    faceWidth: ema(prev?.faceWidth, fresh.faceWidth),
    faceHeight: ema(prev?.faceHeight, fresh.faceHeight),
    tilt: emaAngle(prev?.tilt, fresh.tilt),
    leftOpacity: ema(prev?.leftOpacity, fresh.leftOpacity),
    rightOpacity: ema(prev?.rightOpacity, fresh.rightOpacity),
  };
  cache.set(key, smoothed);
  return smoothed;
}

export function useJewelryOverlay(): UseJewelryOverlayReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // One item per category — Map<JewelryType, JewelryItem>
  const [selectedItems, setSelectedItems] = useState<Map<JewelryType, JewelryItem>>(new Map());
  const [sizeMultipliers, setSizeMultipliers] = useState<Map<string, number>>(new Map());
  const [nudgeOffsets, setNudgeOffsets] = useState<Map<string, NudgeOffset>>(new Map());
  const [imagesLoadVersion, setImagesLoadVersion] = useState(0);
  const jewelryImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const selectedItemsRef = useRef(selectedItems);
  const sizeMultipliersRef = useRef(sizeMultipliers);
  const nudgeOffsetsRef = useRef(nudgeOffsets);
  // Smoothing caches: separate maps for the two anchor shapes.
  const anchorCacheRef = useRef<Map<string, AnchorPoint>>(new Map());
  const earringCacheRef = useRef<Map<string, EarringAnchors>>(new Map());

  useEffect(() => {
    selectedItemsRef.current = selectedItems;
  }, [selectedItems]);
  useEffect(() => {
    sizeMultipliersRef.current = sizeMultipliers;
  }, [sizeMultipliers]);
  useEffect(() => {
    nudgeOffsetsRef.current = nudgeOffsets;
  }, [nudgeOffsets]);

  // Reset smoothing caches when selection changes — stale anchors from a
  // previous item shouldn't bleed into a newly selected one.
  useEffect(() => {
    anchorCacheRef.current.clear();
    earringCacheRef.current.clear();
  }, [selectedItems]);

  // Load/unload images when selection changes
  useEffect(() => {
    const currentIds = new Set<string>();
    selectedItems.forEach((item) => {
      currentIds.add(item.id);
      if (!jewelryImagesRef.current.has(item.id)) {
        const img = new Image();
        img.onload = () => {
          jewelryImagesRef.current.set(item.id, img);
          // Notify static-frame consumers (upload mode) that an image is
          // now ready so they can redraw — without this, swapping rings
          // before the new image loaded would leave the canvas blank or
          // showing the previous ring.
          setImagesLoadVersion((v) => v + 1);
        };
        img.src = item.imageUrl;
      }
    });
    for (const id of jewelryImagesRef.current.keys()) {
      if (!currentIds.has(id)) {
        jewelryImagesRef.current.delete(id);
      }
    }
  }, [selectedItems]);

  const toggleJewelry = useCallback((item: JewelryItem) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      if (prev.get(item.type)?.id === item.id) {
        next.delete(item.type);
      } else {
        next.set(item.type, item);
      }
      return next;
    });
  }, []);

  const removeJewelry = useCallback((type: JewelryType) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      next.delete(type);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedItems(new Map());
    setSizeMultipliers(new Map());
    setNudgeOffsets(new Map());
    jewelryImagesRef.current.clear();
  }, []);

  const setSize = useCallback((itemId: string, multiplier: number) => {
    const clamped = Math.max(SIZE_MIN, Math.min(SIZE_MAX, multiplier));
    setSizeMultipliers((prev) => {
      const next = new Map(prev);
      next.set(itemId, clamped);
      return next;
    });
  }, []);

  const nudge = useCallback((itemId: string, dx: number, dy: number) => {
    setNudgeOffsets((prev) => {
      const next = new Map(prev);
      const cur = prev.get(itemId) ?? { x: 0, y: 0 };
      next.set(itemId, { x: cur.x + dx, y: cur.y + dy });
      return next;
    });
  }, []);

  const resetNudge = useCallback((itemId: string) => {
    setNudgeOffsets((prev) => {
      const next = new Map(prev);
      next.delete(itemId);
      return next;
    });
  }, []);

  const hasAnySelected = selectedItems.size > 0;

  const renderFrame = useCallback(
    (
      source: HTMLVideoElement | HTMLImageElement,
      landmarks: LandmarkResult | null,
      mirror: boolean
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isVideo = source instanceof HTMLVideoElement;
      const videoWidth = isVideo ? source.videoWidth : source.naturalWidth;
      const videoHeight = isVideo ? source.videoHeight : source.naturalHeight;
      if (!videoWidth || !videoHeight) return;

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      ctx.save();
      if (mirror) {
        ctx.translate(videoWidth, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(source, 0, 0, videoWidth, videoHeight);
      ctx.restore();

      if (!landmarks) return;

      const items = selectedItemsRef.current;
      const sizes = sizeMultipliersRef.current;
      const nudges = nudgeOffsetsRef.current;
      const anchorCache = anchorCacheRef.current;
      const earringCache = earringCacheRef.current;

      items.forEach((jewelry) => {
        const jewelryImg = jewelryImagesRef.current.get(jewelry.id);
        if (!jewelryImg) return;

        const mult = sizes.get(jewelry.id) ?? 1;
        const nudgeOffset = nudges.get(jewelry.id);
        const baseConfig = jewelry.overlayConfig;
        const config = {
          ...baseConfig,
          scaleFactor: baseConfig.scaleFactor * mult,
          offsetX: baseConfig.offsetX + (nudgeOffset?.x ?? 0),
          offsetY: baseConfig.offsetY + (nudgeOffset?.y ?? 0),
        };

        switch (jewelry.type) {
          case 'necklace': {
            const fresh = getNecklaceAnchors(
              landmarks.faceLandmarks?.[0] ?? null,
              landmarks.poseLandmarks?.[0] ?? null,
              config.placement || 'princess'
            );
            if (fresh) {
              const smoothed = smoothAnchor(anchorCache, `${jewelry.id}#nk`, fresh);
              const anchor: AnchorPoint = {
                center: { ...smoothed.center },
                width: smoothed.width,
                rotation: smoothed.rotation,
              };
              if (mirror) {
                anchor.center.x = 1 - anchor.center.x;
                anchor.rotation = -anchor.rotation;
              }
              drawNecklaceOverlay(ctx, jewelryImg, anchor, config, videoWidth, videoHeight);
            }
            break;
          }
          case 'earring': {
            const fresh = getEarringAnchors(
              landmarks.faceLandmarks?.[0] ?? null,
              config.earringStyle || 'drop',
              landmarks.headPose
            );
            if (fresh) {
              const smoothed = smoothEarring(earringCache, `${jewelry.id}#er`, fresh);
              const anchors: EarringAnchors = {
                left: { ...smoothed.left },
                right: { ...smoothed.right },
                faceWidth: smoothed.faceWidth,
                faceHeight: smoothed.faceHeight,
                tilt: smoothed.tilt,
                leftOpacity: smoothed.leftOpacity,
                rightOpacity: smoothed.rightOpacity,
              };
              if (mirror) {
                const tempX = anchors.left.x;
                const tempY = anchors.left.y;
                anchors.left.x = 1 - anchors.right.x;
                anchors.left.y = anchors.right.y;
                anchors.right.x = 1 - tempX;
                anchors.right.y = tempY;
                anchors.tilt = -anchors.tilt;
                // Mirror swaps which ear faces the camera.
                const tempOp = anchors.leftOpacity;
                anchors.leftOpacity = anchors.rightOpacity;
                anchors.rightOpacity = tempOp;
              }
              drawEarringOverlay(ctx, jewelryImg, anchors, config, videoWidth, videoHeight);
            }
            break;
          }
          case 'ring': {
            const hands = landmarks.handLandmarks;
            if (hands) {
              hands.forEach((hand, i) => {
                const fresh = getRingAnchors(
                  hand,
                  config.finger || 'ring',
                  config.ringPosition || 'base'
                );
                if (!fresh) return;
                const smoothed = smoothAnchor(anchorCache, `${jewelry.id}#rg-${i}`, fresh);
                const anchor: AnchorPoint = {
                  center: { ...smoothed.center },
                  width: smoothed.width,
                  rotation: smoothed.rotation,
                  opacity: smoothed.opacity,
                };
                if (mirror) {
                  anchor.center.x = 1 - anchor.center.x;
                  anchor.rotation = -anchor.rotation;
                }
                drawJewelryOverlay(ctx, jewelryImg, anchor, config, videoWidth, videoHeight);
              });
            }
            break;
          }
          case 'bracelet': {
            const hands = landmarks.handLandmarks;
            if (hands) {
              hands.forEach((hand, i) => {
                const fresh = getBraceletAnchors(hand, config.braceletStyle || 'bangle');
                if (!fresh) return;
                const smoothed = smoothAnchor(anchorCache, `${jewelry.id}#br-${i}`, fresh);
                const anchor: AnchorPoint = {
                  center: { ...smoothed.center },
                  width: smoothed.width,
                  rotation: smoothed.rotation,
                  opacity: smoothed.opacity,
                };
                if (mirror) {
                  anchor.center.x = 1 - anchor.center.x;
                  anchor.rotation = -anchor.rotation;
                }
                drawJewelryOverlay(ctx, jewelryImg, anchor, config, videoWidth, videoHeight);
              });
            }
            break;
          }
        }
      });
    },
    []
  );

  return {
    canvasRef,
    selectedItems,
    toggleJewelry,
    removeJewelry,
    clearAll,
    hasAnySelected,
    sizeMultipliers,
    setSize,
    nudgeOffsets,
    nudge,
    resetNudge,
    imagesLoadVersion,
    renderFrame,
  };
}
