// Side-effect import: injects the compiled Tailwind CSS into document.head
// on first import so consumers don't need to import the stylesheet manually.
import './styles.generated';

export { default as TryOnWidget } from './components/TryOnWidget';
export type { TryOnWidgetProps, Catalog, TryOnMode } from './types/widget';
export type {
  JewelryItem,
  JewelryType,
  OverlayConfig,
  AnchorType,
  NecklacePlacement,
  EarringStyle,
  Finger,
  RingPosition,
  BraceletStyle,
} from './types/jewelry';
