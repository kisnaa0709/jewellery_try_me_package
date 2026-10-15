'use client';

import { JewelryItem } from '../types/jewelry';

interface ProductGridProps {
  items: JewelryItem[];
  selectedId: string | null;
  onSelect: (item: JewelryItem) => void;
}

function formatPrice(price?: number): string {
  if (price == null) return '';
  // Default to ₹ — consumers can override later via prop if needed.
  return `₹${price.toLocaleString('en-IN')}`;
}

export default function ProductGrid({ items, selectedId, onSelect }: ProductGridProps) {
  return (
    <div className="bytive-grid">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="bytive-card"
          data-selected={item.id === selectedId}
          onClick={() => onSelect(item)}
        >
          {item.id === selectedId && (
            <span className="bytive-check" aria-hidden>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M2 5.5L4.5 8L9 3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
          <div className="bytive-card-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.name} />
          </div>
          <div className="bytive-card-meta">
            <div className="bytive-card-name">{item.name}</div>
            {item.price != null && (
              <div className="bytive-card-price">{formatPrice(item.price)}</div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
