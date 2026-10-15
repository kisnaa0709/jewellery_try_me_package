# @bytive/jewel-try-me

Drop-in virtual jewelry try-on widget for React. One component renders a "Try It On" trigger button on your PDP plus a modal/drawer with three modes: live webcam, photo upload, and a static hand demo with a skin-tone slider.

## Install

```bash
npm install @bytive/jewel-try-me @mediapipe/tasks-vision
# or
bun add @bytive/jewel-try-me @mediapipe/tasks-vision
```

`react`, `react-dom`, and `@mediapipe/tasks-vision` are peer deps — your app provides them.

## Usage

```tsx
'use client'; // Next.js App Router

import { TryOnWidget, type JewelryItem, type Catalog } from '@bytive/jewel-try-me';
import '@bytive/jewel-try-me/styles.css';

const product: JewelryItem = {
  id: 'RG001',
  name: 'Akira Cluster Ring',
  type: 'ring',
  imageUrl: '/assets/jewelry/RG001_ring.png',
  price: 26469,
  overlayConfig: { anchorType: 'finger', scaleFactor: 1.2, offsetX: 0, offsetY: 0 },
};

const catalog: Catalog = {
  rings: [product /* …others */],
  necklaces: [/* … */],
  earrings: [/* … */],
  bracelets: [/* … */],
};

export default function PDP() {
  return (
    <TryOnWidget
      apiKey="your_gemini_api_key"
      aiApiKey="AIza..."                 // optional — enables Refine with AI
      product={product}                  // primary item, pre-selected
      catalog={catalog}                  // alternates, grouped by category
      onAddToCart={(item) => addToCart(item)}
    />
  );
}
```

The component renders its own "Try It On" trigger button. Mount it once on your PDP — the modal/drawer is internal.

### Props

| prop | required | what it does |
|---|---|---|
| `apiKey` | ✓ | Bytive license key. Sent as `X-Bytive-Key` to the hosted backend. |
| `product` | ✓ | The product currently shown on your PDP. Pre-selected in its category; name shown in widget header. |
| `catalog` | ✓ | `{ rings?, necklaces?, earrings?, bracelets? }`. Only the keys you supply appear as chips. |
| `aiApiKey` | — | Gemini key for the AI Refine feature. If absent, the Refine button is hidden. |
| `onAddToCart` | — | `(item) => void`. If absent, the Add-to-Cart button is hidden. |
| `handImageUrls` | — | `[dark, medium, light]` URLs to override the bundled hand photos. |
| `hideTrigger` | — | Skip the default trigger button — pair with `open` / `onOpenChange` for controlled mode. |
| `open` / `onOpenChange` | — | Controlled open state. |

### `JewelryItem` shape

```ts
{
  id: string;
  name: string;
  type: 'ring' | 'necklace' | 'earring' | 'bracelet';
  imageUrl: string;          // PNG with transparent background
  price?: number;            // shown as ₹ in footer + grid
  overlayConfig: {
    anchorType: 'finger' | 'neck' | 'ears' | 'wrist';
    scaleFactor: number;     // per-item size knob
    offsetX: number;         // normalized canvas units
    offsetY: number;
    placement?: 'collar' | 'choker' | 'princess' | 'matinee' | 'opera' |
                'rope' | 'lariat' | 'layered' | 'yPendant';
    earringStyle?: 'stud' | 'huggie' | 'hoop' | 'drop' | 'chandelier' |
                   'jacket' | 'threader' | 'climber' | 'cuff' | 'tassel' |
                   'statement';
    finger?: 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';
    ringPosition?: 'base' | 'mid' | 'midi' | 'tip';
    braceletStyle?: 'watch' | 'tennis' | 'bangle' | 'cuff';
  };
}
```

## Behavior

- **Mobile (<720px)** — bottom drawer with drag handle, slides up.
- **Desktop (≥720px)** — centered modal, two-column body.
- **Webcam mode** — live MediaPipe tracking; jewelry composites onto the video stream.
- **Upload mode** — one-shot detect on an uploaded photo.
- **Hand mode** — only available for ring & bracelet categories. Static hand photo with three skin tones (slider) and the ring/bracelet composited at fixed positions.
- **Selection model** — one item per category; necklace + earring + ring + bracelet can be tried on simultaneously.

## Security note (read this)

Two distinct keys, two distinct lifecycles:

- **`apiKey`** — Bytive license key. It identifies *which customer* the widget is calling on behalf of. Safe to expose in client code.
- **`aiApiKey`** — your Gemini API key. **Don't** put this in `process.env.NEXT_PUBLIC_*` or hardcode it in the bundle — anyone can extract it.

Recommended pattern: serve the AI key from your own backend after authenticating the user, and pass the short-lived value into `<TryOnWidget aiApiKey={...} />` at runtime.

## Backend

The component talks to a single hardcoded URL: `https://api.bytive.in/v1/try-on`. The Bytive backend validates `apiKey` and proxies AI requests using the consumer-supplied `aiApiKey`. Nothing for you to host.

For local development of this package, edit `packages/jewel-try-me/src/lib/config.ts` to point at your local backend (`http://localhost:3002/v1/try-on`) — and remember to flip it back before publishing.

## Develop

```bash
# from repo root
bun install

# in packages/jewel-try-me
bun run dev          # tsup watch mode (JS only)
bun run build        # build dist/{esm,cjs,d.ts,styles.css}
bun run typecheck
```

## Publish

```bash
cd packages/jewel-try-me

# 1. Verify the production URL is set in src/lib/config.ts
#    export const BYTIVE_API_URL = 'https://api.bytive.in/v1/try-on';

# 2. Bump version
npm version patch   # or minor / major

# 3. Publish (runs typecheck + build via prepublishOnly)
npm publish
```

`publishConfig.access: "public"` is set, so scoped `@bytive/...` publishes to the public registry without an extra flag.

## Deploy the backend

The backend (`backend/` in this repo) is a small Express server with three responsibilities: validate `X-Bytive-Key`, forward image-refinement requests to Gemini using the `X-AI-Key` header, and CORS-allow any origin (the widget is called from arbitrary consumer sites).

Minimal env required in production:

```
BYTIVE_API_KEY=<your_real_license_key>
BYPASS_API_KEY=<master_bypass_for_curl>
PORT=3002
```

Endpoints:

```
GET  /v1/try-on/validate       # apiKey-only check
POST /v1/try-on/refine         # body: { userImage, jewelryId, jewelryType }
GET  /health
```

Deploy as a standard Node service (Fly, Railway, Render, ECS — anything that runs `node dist/index.js`). The component's hardcoded URL must point at the deployed origin.

## Bundle size

- ESM: ~253 KB (includes 3 hand photos as inlined data URLs, ~145 KB)
- CJS: ~258 KB
- styles.css: ~18 KB minified

If size matters, swap the inlined hand photos for CDN URLs by passing `handImageUrls` and removing the inline imports from `src/lib/handAssets.ts`.
