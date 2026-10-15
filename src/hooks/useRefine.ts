'use client';

import { useState, useCallback } from 'react';
import { canvasToBase64 } from '../lib/imageUtils';
import { BYTIVE_API_URL } from '../lib/config';

interface RefineResult {
  refinedImage: string; // base64
  cached: boolean;
}

interface UseRefineReturn {
  refine: (
    canvas: HTMLCanvasElement,
    jewelryId: string,
    jewelryType: string
  ) => Promise<void>;
  refinedImage: string | null;
  isRefining: boolean;
  error: string | null;
  clearRefined: () => void;
}

export function useRefine(apiKey: string, aiApiKey: string): UseRefineReturn {
  const [refinedImage, setRefinedImage] = useState<string | null>(null);
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refine = useCallback(
    async (
      canvas: HTMLCanvasElement,
      jewelryId: string,
      jewelryType: string
    ) => {
      setIsRefining(true);
      setError(null);

      try {
        const userImage = canvasToBase64(canvas);

        const response = await fetch(`${BYTIVE_API_URL}/refine`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Bytive-Key': apiKey,
            'X-AI-Key': aiApiKey,
          },
          body: JSON.stringify({
            userImage,
            jewelryId,
            jewelryType,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          throw new Error(
            errData?.error || `Refinement failed (${response.status})`
          );
        }

        const data: RefineResult = await response.json();
        setRefinedImage(data.refinedImage);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to refine image'
        );
      } finally {
        setIsRefining(false);
      }
    },
    [apiKey, aiApiKey]
  );

  const clearRefined = useCallback(() => {
    setRefinedImage(null);
    setError(null);
  }, []);

  return { refine, refinedImage, isRefining, error, clearRefined };
}
