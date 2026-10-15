import { JewelryItem, JewelryType } from './jewelry';

// Consumer-supplied catalog: optional list per category. Whichever
// categories the consumer provides will appear as chips in the widget.
export interface Catalog {
  rings?: JewelryItem[];
  necklaces?: JewelryItem[];
  earrings?: JewelryItem[];
  bracelets?: JewelryItem[];
}

export interface TryOnWidgetProps {
  /** Bytive API key — validates the consumer is authorized to use the package. */
  apiKey: string;
  /**
   * Gemini API key. Optional. When omitted, the AI Refine feature is hidden.
   * NEVER expose your real key in client code — fetch a short-lived token
   * from your own backend instead.
   */
  aiApiKey?: string;
  /**
   * The product the consumer's PDP is currently showing. Pre-selected in
   * its category and shown in the widget header.
   */
  product: JewelryItem;
  /** Catalog of alternates, grouped by category. */
  catalog: Catalog;
  /**
   * Add-to-cart callback. When provided, the footer shows an Add to Cart
   * button and invokes this with the currently-foregrounded item.
   */
  onAddToCart?: (item: JewelryItem) => void;
  /**
   * Override the bundled hand-mode photos. Provide a 3-tuple in the order
   * [dark, medium, light] — the slider snaps between them. Bundled defaults
   * are used when omitted.
   */
  handImageUrls?: [string, string, string];
  /** Hide the default Try-It-On trigger button (use controlled mode). */
  hideTrigger?: boolean;
  /** Controlled open state — pair with onOpenChange. */
  open?: boolean;
  /** Open/close callback when controlled. */
  onOpenChange?: (open: boolean) => void;
}

// Mode the widget is currently in.
export type TryOnMode = 'webcam' | 'upload' | 'hand';

// JewelryType ↔ category-key mapping, kept here so both sides agree.
export const TYPE_TO_CATEGORY: Record<JewelryType, keyof Catalog> = {
  ring: 'rings',
  necklace: 'necklaces',
  earring: 'earrings',
  bracelet: 'bracelets',
};

export const CATEGORY_LABEL: Record<keyof Catalog, string> = {
  rings: 'Rings',
  necklaces: 'Necklaces',
  earrings: 'Earrings',
  bracelets: 'Bracelets',
};
