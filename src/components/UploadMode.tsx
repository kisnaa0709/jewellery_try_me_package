'use client';

import { useEffect, useRef, useState } from 'react';
import { LandmarkResult } from '../types/landmarks';

interface UploadModeProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  detectImage: (img: HTMLImageElement) => Promise<LandmarkResult | null>;
  setRunningMode: (mode: 'VIDEO' | 'IMAGE') => Promise<void>;
  renderFrame: (
    source: HTMLVideoElement | HTMLImageElement,
    landmarks: LandmarkResult | null,
    mirror: boolean
  ) => void;
  hasAnySelected: boolean;
  isModelLoading: boolean;
  isRefining: boolean;
  refiningSnapshot: string | null;
  // Re-renders when these change so size/nudge tweaks stay visible.
  reRenderKey: unknown;
}

export default function UploadMode({
  canvasRef,
  detectImage,
  setRunningMode,
  renderFrame,
  hasAnySelected,
  isModelLoading,
  isRefining,
  refiningSnapshot,
  reRenderKey,
}: UploadModeProps) {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const renderFrameRef = useRef(renderFrame);
  renderFrameRef.current = renderFrame;

  useEffect(() => {
    setRunningMode('IMAGE').catch(() => {});
  }, [setRunningMode]);

  useEffect(() => {
    if (!uploadedImage) return;
    let cancelled = false;
    (async () => {
      renderFrameRef.current(uploadedImage, null, false);
      if (!hasAnySelected || isModelLoading) return;
      try {
        const landmarks = await detectImage(uploadedImage);
        if (cancelled) return;
        renderFrameRef.current(uploadedImage, landmarks, false);
      } catch (err) {
        console.error('[UploadMode] detection failed:', err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [uploadedImage, hasAnySelected, isModelLoading, detectImage, reRenderKey]);

  const [isDragging, setIsDragging] = useState(false);

  const loadFile = (file: File | undefined | null) => {
    if (!file || !file.type.startsWith('image/')) return;
    const img = new Image();
    img.onload = () => setUploadedImage(img);
    img.src = URL.createObjectURL(file);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    loadFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <>
      {!uploadedImage ? (
        <div className="bytive-preview bytive-preview-empty-wrap">
          <label
            className={`bytive-dropzone-area${isDragging ? ' bytive-dropzone-active' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input type="file" accept="image/*" onChange={handleUpload} hidden />
            <div className="bytive-dropzone-icon-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 4v12M7 9l5-5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 16v3a2 2 0 002 2h14a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <strong>Click to upload or drop a photo</strong>
            <span>JPG / PNG · up to 10MB</span>
          </label>
        </div>
      ) : (
        <>
          <div style={{ padding: '0 20px 8px' }}>
            <button
              type="button"
              className="bytive-btn-secondary"
              onClick={() => setUploadedImage(null)}
              style={{ width: '100%' }}
            >
              Back
            </button>
          </div>
          <div className="bytive-preview bytive-preview-fit">
            <canvas
              ref={canvasRef}
              style={{ display: isRefining ? 'none' : undefined }}
            />
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
        </>
      )}
    </>
  );
}
