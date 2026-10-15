import * as react_jsx_runtime from 'react/jsx-runtime';

type JewelryType = 'necklace' | 'earring' | 'ring' | 'bracelet';
type AnchorType = 'neck' | 'ears' | 'finger' | 'wrist' | 'shoulder';
type NecklacePlacement = 'collar' | 'choker' | 'princess' | 'matinee' | 'opera' | 'rope' | 'lariat' | 'layered' | 'yPendant';
type EarringStyle = 'stud' | 'huggie' | 'hoop' | 'drop' | 'chandelier' | 'jacket' | 'threader' | 'climber' | 'cuff' | 'tassel' | 'statement';
type Finger = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';
type RingPosition = 'base' | 'mid' | 'midi' | 'tip';
type BraceletStyle = 'watch' | 'tennis' | 'bangle' | 'cuff';
interface OverlayConfig {
    anchorType: AnchorType;
    scaleFactor: number;
    offsetX: number;
    offsetY: number;
    placement?: NecklacePlacement;
    earringStyle?: EarringStyle;
    finger?: Finger;
    ringPosition?: RingPosition;
    braceletStyle?: BraceletStyle;
}
interface JewelryItem {
    id: string;
    name: string;
    type: JewelryType;
    imageUrl: string;
    price?: number;
    overlayConfig: OverlayConfig;
}

interface Catalog {
    rings?: JewelryItem[];
    necklaces?: JewelryItem[];
    earrings?: JewelryItem[];
    bracelets?: JewelryItem[];
}
interface TryOnWidgetProps {
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
type TryOnMode = 'webcam' | 'upload' | 'hand';

declare function TryOnWidget(props: TryOnWidgetProps): react_jsx_runtime.JSX.Element;

export { type AnchorType, type BraceletStyle, type Catalog, type EarringStyle, type Finger, type JewelryItem, type JewelryType, type NecklacePlacement, type OverlayConfig, type RingPosition, type TryOnMode, TryOnWidget, type TryOnWidgetProps };
