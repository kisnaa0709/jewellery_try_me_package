'use client';

import { Catalog, CATEGORY_LABEL } from '../types/widget';

interface CategoryChipsProps {
  categories: (keyof Catalog)[];
  active: keyof Catalog;
  onChange: (cat: keyof Catalog) => void;
}

export default function CategoryChips({ categories, active, onChange }: CategoryChipsProps) {
  return (
    <div className="bytive-chips" role="tablist">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          role="tab"
          className="bytive-chip"
          data-active={active === cat}
          aria-selected={active === cat}
          onClick={() => onChange(cat)}
        >
          {CATEGORY_LABEL[cat]}
        </button>
      ))}
    </div>
  );
}
