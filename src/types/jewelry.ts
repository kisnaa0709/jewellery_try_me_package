export type JewelryType = 'necklace' | 'earring' | 'ring' | 'bracelet';

export type AnchorType = 'neck' | 'ears' | 'finger' | 'wrist' | 'shoulder';

// Necklace placement: how high/low the visible top of the chain sits.
// Ordered from highest (tight on neck) to lowest (well past the collarbone).
//   collar   = 12–13", flat at the very base of the neck
//   choker   = 14–16", snug on the neck
//   princess = 17–19", collarbone (most common single-strand)
//   matinee  = 20–24", upper chest
//   opera    = 28–34", mid-chest
//   rope     = 35"+, past mid-chest
//   lariat   = open-end, drops far down
//   layered  = multi-strand bib/cascade — top strand crosses the neck base
//              so the V of chains sits at the collarbone and lower strands
//              fan onto the chest
//   yPendant = chains converge to a pendant Y between the collarbones
export type NecklacePlacement =
  | 'collar'
  | 'choker'
  | 'princess'
  | 'matinee'
  | 'opera'
  | 'rope'
  | 'lariat'
  | 'layered'
  | 'yPendant';

// Earring style — drives the relative size and lobe-anchor offset.
//   stud       = small, sits flush on the lobe
//   huggie     = tiny hoop that hugs the lobe
//   hoop       = round mid-size
//   drop       = hangs below the lobe (default for most pieces)
//   chandelier = large multi-tier drop
//   jacket     = stud + back ornament
//   threader   = thin chain threaded through the lobe
//   climber    = sits on the lobe and climbs up the helix
//   cuff       = clips to the outer-ear cartilage (no lobe anchor)
//   tassel     = long fringe / chain bundle that swings
//   statement  = oversized stud, fills the lobe
export type EarringStyle =
  | 'stud'
  | 'huggie'
  | 'hoop'
  | 'drop'
  | 'chandelier'
  | 'jacket'
  | 'threader'
  | 'climber'
  | 'cuff'
  | 'tassel'
  | 'statement';

// Which finger a ring sits on. Maps to MediaPipe Hand Landmarker MCP indices.
export type Finger = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';

// Position along the finger.
//   base = at the MCP knuckle (most rings)
//   mid  = mid proximal phalanx
//   midi = between PIP and DIP (a "midi ring")
//   tip  = between DIP and fingertip
export type RingPosition = 'base' | 'mid' | 'midi' | 'tip';

// How a bracelet sits on the wrist / forearm.
//   watch  = at the wrist crease (where a watch face sits)
//   tennis = snug, just above the crease
//   bangle = at the wrist bone (default — looser ring above the joint)
//   cuff   = sits high up, on the forearm above the bone
export type BraceletStyle = 'watch' | 'tennis' | 'bangle' | 'cuff';

export interface OverlayConfig {
  anchorType: AnchorType;
  scaleFactor: number;
  offsetX: number;
  offsetY: number;
  // Necklace-specific
  placement?: NecklacePlacement;
  // Earring-specific
  earringStyle?: EarringStyle;
  // Ring-specific (defaults: finger='ring', position='base')
  finger?: Finger;
  ringPosition?: RingPosition;
  // Bracelet-specific (default: 'bangle')
  braceletStyle?: BraceletStyle;
}

export interface JewelryItem {
  id: string;
  name: string;
  type: JewelryType;
  imageUrl: string;
  price?: number;
  overlayConfig: OverlayConfig;
}

export const JEWELRY_TYPE_TO_ANCHOR: Record<JewelryType, AnchorType> = {
  necklace: 'neck',
  earring: 'ears',
  ring: 'finger',
  bracelet: 'wrist',
};

// Position of the necklace's TOP anchor along the chin → shoulder line.
//   0  = at chin                  1  = at the actual shoulder (acromion)
//   ~0.5 ≈ collarbone / suprasternal notch (where a princess top sits)
// The renderer extends the necklace image downward from this anchor, so
// these values pin the top edge of the chain — NOT the pendant. The shoulder
// signal from MediaPipe pose reports the AC joint, which is well below the
// collarbone, so princess ≈ 0.55 places the
// top of the chain at the neck base, not down on the chest.
export const NECKLACE_PLACEMENT_OFFSET: Record<NecklacePlacement, number> = {
  collar: 0.10, // 12–13" — very tight, base of neck
  choker: 0.18, // 14–16" — snug on the neck
  princess: 0.30, // 17–19" — collarbone / suprasternal notch
  matinee: 0.55, // 20–24" — upper chest, just below collarbone
  opera: 0.80, // 28–34" — mid-chest, hangs onto sternum
  rope: 1.05, // 35"+ — past mid-chest
  lariat: 1.10, // open-end, drops far
  layered: 0.25, // multi-strand top crosses neck base, lower strands fan out
  yPendant: 0.32, // chains converge to a pendant at upper sternum
};

// Position of bracelet anchor along wrist → forearm. 0 = wrist crease (palm
// side), 1 = ~one hand-length up the forearm. Used as `forearmShift` in the
// bracelet anchor — pulls the rendered position past the visible wrist crease.
export const BRACELET_FOREARM_SHIFT: Record<BraceletStyle, number> = {
  watch: 0.05, // sits on the wrist crease (where a watch face goes)
  tennis: 0.12, // snug just above the crease
  bangle: 0.22, // at the wrist bone — default for most bangles
  cuff: 0.40, // high cuff, sits up on the forearm
};

// Width of the bracelet relative to palm width (index MCP ↔ pinky MCP).
// Wrist circumference is < palm width; smaller styles sit tighter.
export const BRACELET_WIDTH_RATIO: Record<BraceletStyle, number> = {
  watch: 0.72,
  tennis: 0.68,
  bangle: 0.70,
  cuff: 0.78,
};

// Base scale for earring styles (relative to face width). Drop-style pieces
// hang longer so they read at smaller widths; statement and tassel are large.
export const EARRING_STYLE_SCALE: Record<EarringStyle, number> = {
  stud: 0.12,
  huggie: 0.13,
  hoop: 0.20,
  drop: 0.22,
  chandelier: 0.35,
  jacket: 0.18,
  threader: 0.16, // long thread, narrow
  climber: 0.20, // climbs upward — uses negative offset Y in the catalog
  cuff: 0.16, // clips to the helix, not the lobe
  tassel: 0.30,
  statement: 0.28,
};

// Lobe-anchor offset: rendered earring sits below the tragion by this fraction
// of face height. Studs and huggies hug the lobe; long drops anchor higher
// so the body of the earring hangs naturally off the post.
export const EARRING_LOBE_SHIFT: Record<EarringStyle, number> = {
  stud: 0.04,
  huggie: 0.04,
  hoop: 0.05,
  drop: 0.06,
  chandelier: 0.06,
  jacket: 0.05,
  threader: 0.07,
  climber: -0.02, // anchors above the lobe — climbs the helix
  cuff: -0.03, // clips above the tragion on the cartilage
  tassel: 0.06,
  statement: 0.04,
};

// MediaPipe Hand Landmarker MCP indices per finger.
export const FINGER_MCP_INDEX: Record<Finger, number> = {
  thumb: 2,
  index: 5,
  middle: 9,
  ring: 13,
  pinky: 17,
};
