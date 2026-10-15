import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  // The build script wipes dist/ once at the start, then Tailwind writes
  // dist/styles.css. If tsup cleaned here, that file would be deleted.
  clean: false,
  sourcemap: true,
  external: ['react', 'react-dom', '@mediapipe/tasks-vision'],
  // Inline hand-mode webps as data URLs so the package is self-contained.
  // 145KB total → ~200KB bundle bloat — acceptable for v0.1; can switch to
  // CDN-hosted assets later if needed.
  loader: { '.webp': 'dataurl' },
  // 'use client' must survive bundling so Next.js consumers don't get an SSR
  // crash on browser-only APIs (canvas, webcam).
  banner: { js: '"use client";' },
});
