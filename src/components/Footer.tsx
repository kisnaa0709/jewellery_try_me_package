'use client';

import { JewelryItem } from '../types/jewelry';

interface FooterProps {
  item: JewelryItem;
  onAddToCart?: (item: JewelryItem) => void;
}

function formatPrice(price?: number): string {
  if (price == null) return '';
  return `₹${price.toLocaleString('en-IN')}`;
}

export default function Footer({ item, onAddToCart }: FooterProps) {
  return (
    <div className="bytive-footer">
      <div>
        <div className="bytive-footer-meta-name">{item.name}</div>
        {item.price != null && (
          <div className="bytive-footer-meta-price">{formatPrice(item.price)}</div>
        )}
      </div>
      {onAddToCart && (
        <button
          type="button"
          className="bytive-btn-primary"
          onClick={() => onAddToCart(item)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
