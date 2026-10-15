'use client';

import { useEffect, useRef } from 'react';
import { useWebcam } from '../hooks/useWebcam';
import { LandmarkResult } from '../types/landmarks';

interface WebcamModeProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  detect: (video: HTMLVideoElement) => LandmarkResult | null;
  setRunningMode: (mode: 'VIDEO' | 'IMAGE') => Promise<void>;
  renderFrame: (
    source: HTMLVideoElement | HTMLImageElement,
    landmarks: LandmarkResult | null,
    mirror: boolean
  ) => void;
  hasAnySelected: boolean;
  onError?: (msg: string) => void;
  isActive: boolean;
  isRefining: boolean;
  refiningSnapshot: string | null;
}

export default function WebcamMode({
  canvasRef,
  detect,
  setRunningMode,
  renderFrame,
  hasAnySelected,
  onError,
  isActive,
  isRefining,
  refiningSnapshot,
}: WebcamModeProps) {
  const { videoRef, isStreaming, error, start, stop } = useWebcam();
  const animFrameRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  const detectRef = useRef(detect);
  const renderFrameRef = useRef(renderFrame);
  detectRef.current = detect;
  renderFrameRef.current = renderFrame;

  useEffect(() => {
    setRunningMode('VIDEO').catch(() => { /* models may not be loaded */ });
    return () => stop();
  }, [setRunningMode, stop]);

  // Release the camera when the host dialog closes — getUserMedia keeps the
  // indicator on otherwise, even though the widget UI is hidden.
  useEffect(() => {
    if (!isActive) stop();
  }, [isActive, stop]);

  useEffect(() => {
    if (error && onError) onError(error);
  }, [error, onError]);

  // Animation loop — only runs once the user has picked something to try on.
  // Without items, we just stream the raw video for a "camera ready" preview.
  useEffect(() => {
    if (!isStreaming || !hasAnySelected) {
      isRunningRef.current = false;
      return;
    }
    isRunningRef.current = true;
    let lastLandmarks: LandmarkResult | null = null;

    const loop = () => {
      if (!isRunningRef.current) return;
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        try {
          const fresh = detectRef.current(video);
          if (fresh) lastLandmarks = fresh;
        } catch { /* keep last */ }
        renderFrameRef.current(video, lastLandmarks, true);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunningRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isStreaming, hasAnySelected, videoRef]);

  const showRawVideo = !hasAnySelected;

  return (
    <div className="bytive-preview">
      {!isStreaming && !isRefining && (
        <div className="bytive-preview-empty">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M16 10l5-3v10l-5-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <strong>Camera ready</strong>
          <span>Allow access to start your live preview</span>
          <button
            type="button"
            className="bytive-btn-primary"
            onClick={start}
            style={{ marginTop: 8 }}
          >
            Enable Camera
          </button>
        </div>
      )}
      <video
        ref={videoRef}
        playsInline
        muted
        style={{
          display: !isRefining && isStreaming && showRawVideo ? 'block' : 'none',
          transform: showRawVideo ? 'scaleX(-1)' : undefined,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{ display: !isRefining && isStreaming && !showRawVideo ? 'block' : 'none' }}
      />
      {!isRefining && isStreaming && hasAnySelected && (
        <div className="bytive-tracking-pill">Tracking</div>
      )}
      {isRefining && refiningSnapshot && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={refiningSnapshot}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="bytive-refine-overlay" aria-hidden />
          <div className="bytive-refine-status">Enhancing with AI…</div>
        </>
      )}
    </div>
  );
}
