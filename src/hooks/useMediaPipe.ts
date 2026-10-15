'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  createFaceLandmarker,
  createHandLandmarker,
  createPoseLandmarker,
} from '../lib/mediapipe';
import { JewelryType } from '../types/jewelry';
import { LandmarkResult, Point, HeadPose } from '../types/landmarks';

/**
 * Decompose MediaPipe's facial transformation matrix into Euler angles.
 *
 * The matrix is a 4x4 column-major rigid transform mapping the canonical face
 * model to the runtime face. We extract the upper-left 3x3 rotation block and
 * decompose it as R = Rz(roll) · Rx(pitch) · Ry(yaw). The angle ranges:
 *   yaw   ∈ [-π/2, π/2]   negative when face turns toward viewer-left
 *   pitch ∈ [-π/2, π/2]   negative when chin lifts (head tips back)
 *   roll  ∈ [-π,   π]     negative when head tilts so the right ear drops
 */
function decomposeMatrix(m: Float32Array | number[]): HeadPose {
  // Column-major: m[col*4 + row]. Rotation 3x3 lives in cols 0..2, rows 0..2.
  const r00 = m[0], r10 = m[1], r20 = m[2];
  const r01 = m[4], r11 = m[5], r21 = m[6];
  const r02 = m[8], r12 = m[9], r22 = m[10];

  // Pitch from r12 (sin(pitch) when factored as Rz·Rx·Ry).
  const sinP = -r12;
  const pitch = Math.asin(Math.max(-1, Math.min(1, sinP)));
  let yaw: number;
  let roll: number;
  if (Math.abs(sinP) < 0.9999) {
    yaw = Math.atan2(r02, r22);
    roll = Math.atan2(r10, r11);
  } else {
    // Gimbal-lock fallback.
    yaw = Math.atan2(-r20, r00);
    roll = 0;
  }
  return { yaw, pitch, roll };
}

// Use 'any' for landmarker refs since we lazy-load the module
/* eslint-disable @typescript-eslint/no-explicit-any */

type RequiredModels = {
  face: boolean;
  hand: boolean;
  pose: boolean;
};

function getRequiredModels(jewelryType: JewelryType | null): RequiredModels {
  switch (jewelryType) {
    case 'necklace':
      return { face: true, hand: false, pose: true };
    case 'earring':
      return { face: true, hand: false, pose: false };
    case 'ring':
    case 'bracelet':
      return { face: false, hand: true, pose: false };
    default:
      return { face: false, hand: false, pose: false };
  }
}

interface UseMediaPipeReturn {
  detect: (video: HTMLVideoElement) => LandmarkResult | null;
  detectImage: (image: HTMLImageElement) => Promise<LandmarkResult | null>;
  setRunningMode: (mode: 'VIDEO' | 'IMAGE') => Promise<void>;
  isLoading: boolean;
  error: string | null;
  loadModels: (jewelryType: JewelryType) => Promise<void>;
}

export function useMediaPipe(): UseMediaPipeReturn {
  const faceLandmarkerRef = useRef<any>(null);
  const handLandmarkerRef = useRef<any>(null);
  const poseLandmarkerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedModelsRef = useRef<RequiredModels>({
    face: false,
    hand: false,
    pose: false,
  });

  const loadModels = useCallback(async (jewelryType: JewelryType) => {
    const required = getRequiredModels(jewelryType);
    const toLoad: Promise<void>[] = [];

    // Check if all required models are already loaded
    const allLoaded =
      (!required.face || loadedModelsRef.current.face) &&
      (!required.hand || loadedModelsRef.current.hand) &&
      (!required.pose || loadedModelsRef.current.pose);

    if (allLoaded) {
      console.log('[MediaPipe] All required models already loaded');
      return;
    }

    console.log('[MediaPipe] Loading models...', { required, loaded: { ...loadedModelsRef.current } });
    setIsLoading(true);
    setError(null);

    try {
      if (required.face && !loadedModelsRef.current.face) {
        console.log('[MediaPipe] Loading FaceLandmarker...');
        toLoad.push(
          createFaceLandmarker().then((lm) => {
            faceLandmarkerRef.current = lm;
            loadedModelsRef.current.face = true;
            console.log('[MediaPipe] FaceLandmarker loaded');
          })
        );
      }
      if (required.hand && !loadedModelsRef.current.hand) {
        console.log('[MediaPipe] Loading HandLandmarker...');
        toLoad.push(
          createHandLandmarker().then((lm) => {
            handLandmarkerRef.current = lm;
            loadedModelsRef.current.hand = true;
            console.log('[MediaPipe] HandLandmarker loaded');
          })
        );
      }
      if (required.pose && !loadedModelsRef.current.pose) {
        console.log('[MediaPipe] Loading PoseLandmarker...');
        toLoad.push(
          createPoseLandmarker().then((lm) => {
            poseLandmarkerRef.current = lm;
            loadedModelsRef.current.pose = true;
            console.log('[MediaPipe] PoseLandmarker loaded');
          })
        );
      }

      await Promise.all(toLoad);
      // Newly created landmarkers default to VIDEO; align them with the
      // current desired running mode so a model loaded mid-session in IMAGE
      // mode doesn't fail on the next detect() call.
      if (runningModeRef.current === 'IMAGE') {
        const align: Promise<unknown>[] = [];
        if (faceLandmarkerRef.current) align.push(faceLandmarkerRef.current.setOptions({ runningMode: 'IMAGE' }));
        if (handLandmarkerRef.current) align.push(handLandmarkerRef.current.setOptions({ runningMode: 'IMAGE' }));
        if (poseLandmarkerRef.current) align.push(poseLandmarkerRef.current.setOptions({ runningMode: 'IMAGE' }));
        await Promise.all(align);
      }
      console.log('[MediaPipe] All models loaded successfully');
    } catch (err) {
      console.error('[MediaPipe] Failed to load models:', err);
      setError('Failed to load detection models. Please refresh and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const lastTimestampRef = useRef(0);
  const runningModeRef = useRef<'VIDEO' | 'IMAGE'>('VIDEO');

  const setRunningMode = useCallback(async (mode: 'VIDEO' | 'IMAGE') => {
    if (runningModeRef.current === mode) return;
    const tasks: Promise<unknown>[] = [];
    if (faceLandmarkerRef.current) tasks.push(faceLandmarkerRef.current.setOptions({ runningMode: mode }));
    if (handLandmarkerRef.current) tasks.push(handLandmarkerRef.current.setOptions({ runningMode: mode }));
    if (poseLandmarkerRef.current) tasks.push(poseLandmarkerRef.current.setOptions({ runningMode: mode }));
    await Promise.all(tasks);
    runningModeRef.current = mode;
  }, []);

  const detectImage = useCallback(
    async (image: HTMLImageElement): Promise<LandmarkResult | null> => {
      if (runningModeRef.current !== 'IMAGE') {
        await setRunningMode('IMAGE');
      }

      let faceLandmarks: Point[][] | null = null;
      let handLandmarks: Point[][] | null = null;
      let poseLandmarks: Point[][] | null = null;
      let headPose: HeadPose | null = null;

      try {
        if (faceLandmarkerRef.current) {
          const result = faceLandmarkerRef.current.detect(image);
          if (result.faceLandmarks?.length) {
            faceLandmarks = result.faceLandmarks.map((face: any[]) =>
              face.map((lm: any) => ({ x: lm.x, y: lm.y, z: lm.z }))
            );
          }
          const matrix = result.facialTransformationMatrixes?.[0]?.data;
          if (matrix) headPose = decomposeMatrix(matrix);
        }
        if (handLandmarkerRef.current) {
          const result = handLandmarkerRef.current.detect(image);
          if (result.landmarks?.length) {
            handLandmarks = result.landmarks.map((hand: any[]) =>
              hand.map((lm: any) => ({ x: lm.x, y: lm.y, z: lm.z }))
            );
          }
        }
        if (poseLandmarkerRef.current) {
          const result = poseLandmarkerRef.current.detect(image);
          if (result.landmarks?.length) {
            poseLandmarks = result.landmarks.map((pose: any[]) =>
              pose.map((lm: any) => ({ x: lm.x, y: lm.y, z: lm.z, visibility: lm.visibility }))
            );
          }
        }
      } catch (err) {
        console.error('[MediaPipe] Image detection failed:', err);
        return null;
      }

      return { faceLandmarks, handLandmarks, poseLandmarks, headPose };
    },
    [setRunningMode]
  );

  const detect = useCallback(
    (video: HTMLVideoElement): LandmarkResult | null => {
      // Ensure strictly increasing timestamps for MediaPipe
      let timestamp = performance.now();
      if (timestamp <= lastTimestampRef.current) {
        timestamp = lastTimestampRef.current + 1;
      }
      lastTimestampRef.current = timestamp;

      let faceLandmarks: Point[][] | null = null;
      let handLandmarks: Point[][] | null = null;
      let poseLandmarks: Point[][] | null = null;
      let headPose: HeadPose | null = null;

      try {
        if (faceLandmarkerRef.current) {
          const result = faceLandmarkerRef.current.detectForVideo(
            video,
            timestamp
          );
          if (result.faceLandmarks?.length) {
            faceLandmarks = result.faceLandmarks.map((face: any[]) =>
              face.map((lm: any) => ({ x: lm.x, y: lm.y, z: lm.z }))
            );
          }
          const matrix = result.facialTransformationMatrixes?.[0]?.data;
          if (matrix) headPose = decomposeMatrix(matrix);
        }

        if (handLandmarkerRef.current) {
          const result = handLandmarkerRef.current.detectForVideo(
            video,
            timestamp
          );
          if (result.landmarks?.length) {
            handLandmarks = result.landmarks.map((hand: any[]) =>
              hand.map((lm: any) => ({ x: lm.x, y: lm.y, z: lm.z }))
            );
          }
        }

        if (poseLandmarkerRef.current) {
          const result = poseLandmarkerRef.current.detectForVideo(
            video,
            timestamp
          );
          if (result.landmarks?.length) {
            poseLandmarks = result.landmarks.map((pose: any[]) =>
              pose.map((lm: any) => ({ x: lm.x, y: lm.y, z: lm.z, visibility: lm.visibility }))
            );
          }
        }
      } catch {
        // Detection can fail on some frames, skip silently
        return null;
      }

      return { faceLandmarks, handLandmarks, poseLandmarks, headPose };
    },
    []
  );

  useEffect(() => {
    return () => {
      faceLandmarkerRef.current?.close();
      handLandmarkerRef.current?.close();
      poseLandmarkerRef.current?.close();
    };
  }, []);

  return { detect, detectImage, setRunningMode, isLoading, error, loadModels };
}
