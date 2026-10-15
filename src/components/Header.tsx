'use client';

interface HeaderProps {
  productName: string;
  onClose: () => void;
}

export default function Header({ productName, onClose }: HeaderProps) {
  return (
    <div className="bytive-header">
      <div>
        <h2>Virtual Try-On</h2>
        <div className="bytive-subtitle">{productName}</div>
      </div>
      <button
        type="button"
        className="bytive-icon-btn"
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 3l8 8M11 3l-8 8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
