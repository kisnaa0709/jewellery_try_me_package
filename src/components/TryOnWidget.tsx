'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMediaPipe } from '../hooks/useMediaPipe';
import { useJewelryOverlay } from '../hooks/useJewelryOverlay';
import { useRefine } from '../hooks/useRefine';
import {
  TryOnWidgetProps,
  TryOnMode,
  Catalog,
  TYPE_TO_CATEGORY,
} from '../types/widget';
import { JewelryType } from '../types/jewelry';
import Shell from './Shell';
import Header from './Header';
import ModeTabs from './ModeTabs';
import CategoryChips from './CategoryChips';
import ProductGrid from './ProductGrid';
import Footer from './Footer';
import WebcamMode from './WebcamMode';
import UploadMode from './UploadMode';
import HandMode from './HandMode';

const CATEGORY_TO_TYPE: Record<keyof Catalog, JewelryType> = {
  rings: 'ring',
  necklaces: 'necklace',
  earrings: 'earring',
  bracelets: 'bracelet',
};

export default function TryOnWidget(props: TryOnWidgetProps) {
  const {
    apiKey,
    aiApiKey,
    product,
    catalog,
    onAddToCart,
    handImageUrls,
    hideTrigger,
    open: openProp,
    onOpenChange,
  } = props;

  const isControlled = openProp !== undefined;
  const [openInternal, setOpenInternal] = useState(false);
  const open = isControlled ? !!openProp : openInternal;
  const setOpen = (next: boolean) => {
    if (!isControlled) setOpenInternal(next);
    onOpenChange?.(next);
  };

  const categories = useMemo(
    () => (Object.keys(catalog) as (keyof Catalog)[]).filter((k) => catalog[k]?.length),
    [catalog]
  );
  const initialCategory = TYPE_TO_CATEGORY[product.type];
  const [activeCategory, setActiveCategory] = useState<keyof Catalog>(
    categories.includes(initialCategory) ? initialCategory : categories[0]
  );
  const [mode, setMode] = useState<TryOnMode>('webcam');
  const [error, setError] = useState<string | null>(null);

  const { detect, detectImage, setRunningMode, isLoading: isModelLoading, error: modelError, loadModels } = useMediaPipe();
  const {
    canvasRef,
    selectedItems,
    toggleJewelry,
    hasAnySelected,
    renderFrame,
    sizeMultipliers,
    nudgeOffsets,
    imagesLoadVersion,
  } = useJewelryOverlay();
  const { refine, refinedImage, isRefining, error: refineError, clearRefined } = useRefine(
    apiKey,
    aiApiKey || ''
  );
  const [refiningSnapshot, setRefiningSnapshot] = useState<string | null>(null);

  // Clear the snapshot once the refine finishes (refined image takes over) or
  // the user backs out via clearRefined.
  useEffect(() => {
    if (!isRefining) setRefiningSnapshot(null);
  }, [isRefining]);
  // Pre-select primary product the first time the widget opens.
  const [didPreselect, setDidPreselect] = useState(false);
  useEffect(() => {
    if (!open || didPreselect) return;
    if (!selectedItems.has(product.type)) {
      toggleJewelry(product);
    }
    setDidPreselect(true);
  }, [open, didPreselect, product, selectedItems, toggleJewelry]);

  // Load required models when items change.
  useEffect(() => {
    const types = new Set<JewelryType>();
    selectedItems.forEach((item) => types.add(item.type));
    types.forEach((type) => loadModels(type));
  }, [selectedItems, loadModels]);

  // Surface error from any subsystem.
  useEffect(() => {
    setError(modelError || refineError || null);
  }, [modelError, refineError]);

  const activeType = CATEGORY_TO_TYPE[activeCategory];
  const itemsInCategory = catalog[activeCategory] || [];
  const currentItem = selectedItems.get(activeType) || product;
  const selectedIdInCategory = selectedItems.get(activeType)?.id ?? null;

  // Hand mode is a static demo that only renders rings + bracelets — the two
  // jewelry types that sit on a hand. For necklaces/earrings the tab makes
  // no sense, so we drop it.
  const handAvailable = activeType === 'ring' || activeType === 'bracelet';
  const handItem = handAvailable ? currentItem : null;

  // If the user was in hand mode and switches to a category that doesn't
  // support it, fall back to webcam.
  useEffect(() => {
    if (mode === 'hand' && !handAvailable) setMode('webcam');
  }, [mode, handAvailable]);

  const handleSelect = (item: typeof product) => {
    clearRefined();
    toggleJewelry(item);
  };

  return (
    <>
      {!hideTrigger && (
        <button
          type="button"
          className="bytive-trigger bytive-tryon"
          onClick={() => setOpen(true)}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          Try It On
        </button>
      )}

      <Shell open={open} onClose={() => setOpen(false)}>
        <Header productName={product.name} onClose={() => setOpen(false)} />

        <div className="bytive-body">
          <div className="bytive-body-left">
            <ModeTabs mode={mode} onChange={setMode} handAvailable={handAvailable} />
            {error && <div className="bytive-error">{error}</div>}
            {!refinedImage && mode === 'webcam' && (
              <WebcamMode
                canvasRef={canvasRef}
                detect={detect}
                setRunningMode={setRunningMode}
                renderFrame={renderFrame}
                hasAnySelected={hasAnySelected}
                onError={setError}
                isActive={open}
                isRefining={isRefining}
                refiningSnapshot={refiningSnapshot}
              />
            )}
            {!refinedImage && mode === 'upload' && (
              <UploadMode
                canvasRef={canvasRef}
                detectImage={detectImage}
                setRunningMode={setRunningMode}
                renderFrame={renderFrame}
                hasAnySelected={hasAnySelected}
                isModelLoading={isModelLoading}
                isRefining={isRefining}
                refiningSnapshot={refiningSnapshot}
                reRenderKey={`${Array.from(selectedItems.values())
                  .map((i) => i.id)
                  .join(',')}|${imagesLoadVersion}|${sizeMultipliers.size}|${nudgeOffsets.size}`}
              />
            )}
            {!refinedImage && mode === 'hand' && (
              <HandMode
                handImageUrls={handImageUrls}
                item={handItem}
                detectImage={detectImage}
                setRunningMode={setRunningMode}
                isModelLoading={isModelLoading}
              />
            )}
            {refinedImage && (
              <div className="bytive-preview bytive-refined-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={refinedImage} alt="AI-refined" className="bytive-refined-img" />
                <button
                  type="button"
                  className="bytive-btn-secondary bytive-refined-back"
                  onClick={clearRefined}
                >
                  Back
                </button>
              </div>
            )}
            {aiApiKey && hasAnySelected && mode !== 'hand' && (
              <div style={{ padding: '12px 20px 8px' }}>
                <button
                  type="button"
                  className="bytive-btn-secondary"
                  onClick={() => {
                    if (canvasRef.current && currentItem) {
                      // Freeze the current canvas (frame + jewelry overlay) so we can
                      // keep it on screen while the model runs — works for any mode.
                      setRefiningSnapshot(canvasRef.current.toDataURL('image/png'));
                      refine(canvasRef.current, currentItem.id, currentItem.type);
                    }
                  }}
                  disabled={isRefining}
                  style={{ width: '100%' }}
                >
                  {isRefining ? 'Enhancing…' : refinedImage ? "Refined Image" : 'Refine with AI'}
                </button>
              </div>
            )}
          </div>

          <div className="bytive-body-right">
            <CategoryChips
              categories={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />
            <ProductGrid
              items={itemsInCategory}
              selectedId={selectedIdInCategory}
              onSelect={handleSelect}
            />
          </div>
        </div>

        <Footer item={currentItem} onAddToCart={onAddToCart} />
      </Shell>
    </>
  );
}
