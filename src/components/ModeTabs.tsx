'use client';

import { TryOnMode } from '../types/widget';

interface ModeTabsProps {
  mode: TryOnMode;
  onChange: (mode: TryOnMode) => void;
  /** Hand tab only shows for ring/bracelet categories. */
  handAvailable: boolean;
}

const TABS: { value: TryOnMode; label: string; icon: React.ReactNode }[] = [
  {
    value: 'webcam',
    label: 'Webcam',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="4.5" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M11 7l3.5-2v6L11 9z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: 'upload',
    label: 'Upload',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v8M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 11v2.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: 'hand',
    label: 'Hand',
    icon: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path
          d="M5 8V3.5a1 1 0 112 0V7M7 7V2.5a1 1 0 112 0V7M9 7V3.5a1 1 0 112 0V8M11 7V4.5a1 1 0 112 0V11c0 2.2-1.8 4-4 4H7.5C5 15 3 13 3 10.5V7.5A1 1 0 015 7"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ModeTabs({ mode, onChange, handAvailable }: ModeTabsProps) {
  const tabs = handAvailable ? TABS : TABS.filter((t) => t.value !== 'hand');
  return (
    <div className="bytive-segmented" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          data-active={mode === tab.value}
          aria-selected={mode === tab.value}
          onClick={() => onChange(tab.value)}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
