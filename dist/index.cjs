"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  TryOnWidget: () => TryOnWidget
});
module.exports = __toCommonJS(index_exports);

// src/styles.generated.ts
var css = `/*! tailwindcss v4.2.4 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--spacing:.25rem;--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.visible{visibility:visible}.fixed{position:fixed}.relative{position:relative}.static{position:static}.start{inset-inline-start:var(--spacing)}.end{inset-inline-end:var(--spacing)}.block{display:block}.grid{display:grid}.hidden{display:none}.inline{display:inline}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}}.bytive-tryon{--accent:#7a1c3b;--accent-hover:#631530;--accent-soft:#fbeef2;--ink:#1a1a1a;--ink-soft:#555;--muted:#8a8a8a;--surface:#fff;--surface-2:#f6f5f5;--border:#ececec;--border-strong:#d1d1d1;--radius-card:12px;--radius-pill:9999px;--radius-button:9999px;--shadow-modal:0 20px 60px #0000002e;--font-stack:system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;font-family:var(--font-stack);color:var(--ink)}.bytive-dialog{background:var(--surface);border:none;width:100vw;max-width:100vw;height:100vh;max-height:100vh;margin:0;padding:0;overflow:hidden}.bytive-dialog::backdrop{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#00000073;animation:.18s ease-out bytive-fade-in}.bytive-dialog[open]{display:flex}.bytive-shell{background:var(--surface);border-radius:0;flex-direction:column;width:100%;height:100%;margin:0;animation:.22s cubic-bezier(.22,1,.36,1) bytive-fade-up;display:flex;overflow:hidden}.bytive-header{border-bottom:1px solid var(--border);justify-content:space-between;align-items:flex-start;padding:16px 20px 12px;display:flex}.bytive-header h2{letter-spacing:-.01em;margin:0;font-size:20px;font-weight:700}.bytive-header .bytive-subtitle{color:var(--muted);letter-spacing:.08em;text-transform:uppercase;margin-top:2px;font-size:11px;font-weight:600}.bytive-icon-btn{background:var(--surface-2);width:32px;height:32px;color:var(--ink-soft);cursor:pointer;border:none;border-radius:9999px;justify-content:center;align-items:center;transition:background .12s;display:inline-flex}.bytive-icon-btn:hover{background:var(--border)}.bytive-segmented{background:var(--surface-2);border-radius:12px;gap:4px;margin:12px 20px;padding:4px;display:flex}.bytive-segmented button{color:var(--ink-soft);cursor:pointer;background:0 0;border:none;border-radius:9px;flex:1;justify-content:center;align-items:center;gap:6px;padding:8px 12px;font-size:13px;font-weight:500;transition:all .14s;display:inline-flex}.bytive-segmented button[data-active=true]{background:var(--surface);color:var(--accent);font-weight:600;box-shadow:0 1px 3px #0000000f}.bytive-chips{scrollbar-width:none;z-index:2;background:var(--surface);flex-shrink:0;gap:8px;padding:8px 20px;display:flex;position:sticky;top:0;overflow-x:auto}.bytive-chips::-webkit-scrollbar{display:none}.bytive-chip{border:1px solid var(--border);background:var(--surface);color:var(--ink-soft);cursor:pointer;border-radius:9999px;flex-shrink:0;padding:7px 16px;font-size:13px;font-weight:500;transition:all .14s}.bytive-chip[data-active=true]{background:var(--accent);border-color:var(--accent);color:#fff}.bytive-grid{grid-template-columns:repeat(3,1fr);gap:10px;padding:8px 20px 12px;display:grid}.bytive-card{border:1.5px solid var(--border);border-radius:var(--radius-card);background:var(--surface);cursor:pointer;transition:all .14s;position:relative;overflow:hidden}.bytive-card[data-selected=true]{border-color:var(--accent);background:var(--accent-soft)}.bytive-card-image{aspect-ratio:1;background:var(--surface-2);justify-content:center;align-items:center;padding:14px;display:flex}.bytive-card-image img{object-fit:contain;max-width:100%;max-height:100%}.bytive-card-meta{padding:8px 10px 10px}.bytive-card-name{color:var(--ink);white-space:nowrap;text-overflow:ellipsis;font-size:12px;font-weight:600;overflow:hidden}.bytive-card-price{color:var(--accent);margin-top:2px;font-size:12px;font-weight:700}.bytive-check{background:var(--accent);color:#fff;border-radius:9999px;justify-content:center;align-items:center;width:22px;height:22px;font-size:11px;display:flex;position:absolute;top:6px;right:6px}.bytive-footer{border-top:1px solid var(--border);background:var(--surface);justify-content:space-between;align-items:center;gap:12px;padding:12px 20px 16px;display:flex}.bytive-footer-meta-name{color:var(--ink);font-size:13px;font-weight:600}.bytive-footer-meta-price{color:var(--accent);font-size:13px;font-weight:700}.bytive-btn-primary{border-radius:var(--radius-button);background:var(--accent);color:#fff;cursor:pointer;border:none;justify-content:center;align-items:center;gap:6px;padding:10px 22px;font-size:13px;font-weight:600;transition:background .14s;display:inline-flex}.bytive-btn-primary:hover{background:var(--accent-hover)}.bytive-btn-primary:disabled{opacity:.5;cursor:not-allowed}.bytive-btn-secondary{border-radius:var(--radius-button);background:var(--surface);color:var(--ink);border:1px solid var(--border-strong);cursor:pointer;justify-content:center;align-items:center;gap:6px;padding:8px 16px;font-size:13px;font-weight:500;transition:all .14s;display:inline-flex}.bytive-btn-secondary:hover{background:var(--surface-2)}.bytive-trigger{border-radius:var(--radius-button);background:var(--surface);border:1px solid var(--border-strong);color:var(--ink);cursor:pointer;font-size:13px;font-weight:600;font-family:var(--font-stack);align-items:center;gap:8px;padding:10px 18px;transition:all .14s;display:inline-flex}.bytive-trigger:hover{background:var(--surface-2)}.bytive-preview{background:var(--surface-2);box-sizing:border-box;flex:1;justify-content:center;align-items:center;width:100%;min-height:0;margin:0;display:flex;position:relative;overflow:hidden}.bytive-preview-empty{color:var(--muted);text-align:center;flex-direction:column;align-items:center;gap:8px;padding:20px;display:flex}.bytive-preview-empty svg{color:var(--accent);width:32px;height:32px}.bytive-body{flex-direction:column;flex:1;min-height:0;display:flex;overflow:hidden}.bytive-body-left{flex-direction:column;flex:auto;min-height:0;display:flex;overflow:hidden}.bytive-body-right{border-top:1px solid var(--border);background:var(--surface);flex-direction:column;flex:none;max-height:42vh;display:flex;overflow-y:auto}@media (max-width:719px){.bytive-body{overflow-y:auto}.bytive-body-left{flex:none;overflow:visible}.bytive-body-right{flex:none;max-height:none;overflow:visible}.bytive-preview{flex:none;width:100%;min-height:220px}.bytive-preview canvas,.bytive-preview video{width:100%;height:auto}.bytive-hand-wrap{height:auto}.bytive-hand-figure{aspect-ratio:auto;width:100%;max-width:none;height:auto}.bytive-hand-canvas{width:100%;height:auto}}@media (min-width:720px){.bytive-body{flex-direction:row}.bytive-body-left{border-right:1px solid var(--border);flex:auto}.bytive-body-right{border-top:none;flex:0 0 380px;width:380px;max-height:none}.bytive-grid{grid-template-columns:repeat(2,1fr)}}@media (min-width:1280px){.bytive-body-right{flex-basis:420px;width:420px}}.bytive-hand-wrap{box-sizing:border-box;justify-content:center;align-items:center;width:100%;height:100%;display:flex;position:relative}.bytive-hand-figure{aspect-ratio:1;min-width:0;max-width:100%;height:100%;min-height:0;position:relative}.bytive-hand-img{object-fit:contain;width:100%;height:100%;display:block}.bytive-hand-canvas{width:100%;height:100%;display:block}.bytive-tone-slider{color:var(--ink-soft);z-index:2;pointer-events:auto;flex-direction:column;align-items:center;gap:8px;font-size:11px;display:flex;position:absolute;top:50%;right:12px;transform:translateY(-50%)}.bytive-tone-slider input[type=range]{appearance:slider-vertical;writing-mode:vertical-lr;width:4px;height:140px;accent-color:var(--accent)}.bytive-tone-label{letter-spacing:.04em}.bytive-tracking-pill{background:var(--surface);border:1px solid var(--border);color:var(--ink-soft);border-radius:9999px;align-items:center;gap:6px;padding:4px 10px;font-size:11px;font-weight:500;display:inline-flex;position:absolute;bottom:12px;left:12px}.bytive-tracking-pill:before{content:"";background:var(--accent);border-radius:9999px;width:6px;height:6px;animation:1.4s ease-in-out infinite bytive-pulse}.bytive-product-pill{background:var(--surface);border:1px solid var(--border);color:var(--ink);border-radius:9999px;padding:4px 12px;font-size:12px;font-weight:600;position:absolute;bottom:12px;right:12px}.bytive-dropzone{border:1.5px dashed var(--border-strong);border-radius:var(--radius-card);box-sizing:border-box;cursor:pointer;background:var(--surface);align-self:center;align-items:center;gap:10px;width:calc(100% - 40px);max-width:480px;margin:4px 20px 8px;padding:14px;transition:all .14s;display:flex}.bytive-dropzone:hover{border-color:var(--accent);background:var(--accent-soft)}.bytive-dropzone-icon{background:var(--surface-2);width:36px;height:36px;color:var(--ink-soft);border-radius:9px;justify-content:center;align-items:center;display:flex}.bytive-dropzone-text strong{color:var(--ink);font-size:13px;font-weight:600;display:block}.bytive-dropzone-text small{color:var(--muted);font-size:11px}.bytive-dropzone-active{border-color:var(--accent);background:var(--accent-soft)}.bytive-preview-empty-wrap{background:0 0;padding:12px}.bytive-dropzone-area{border:1.5px dashed var(--border-strong);border-radius:var(--radius-card);background:var(--surface);text-align:center;width:100%;height:100%;color:var(--ink-soft);cursor:pointer;box-sizing:border-box;flex-direction:column;justify-content:center;align-items:center;gap:10px;padding:24px;transition:all .14s;display:flex}.bytive-dropzone-area:hover,.bytive-dropzone-area.bytive-dropzone-active{border-color:var(--accent);background:var(--accent-soft)}.bytive-dropzone-icon-lg{background:var(--accent-soft);width:56px;height:56px;color:var(--accent);border-radius:9999px;justify-content:center;align-items:center;margin-bottom:4px;display:flex}.bytive-dropzone-area strong{color:var(--ink);font-size:14px;font-weight:600}.bytive-dropzone-area span{color:var(--muted);font-size:12px}.bytive-preview canvas,.bytive-preview video{object-fit:contain;width:100%;height:100%}.bytive-preview-fit canvas{margin:0 auto!important}.bytive-refined-img{object-fit:contain;width:100%;height:100%}.bytive-refined-back{z-index:1;position:absolute;top:8px;right:8px}.bytive-error{color:#991b1b;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;margin:0 20px 8px;padding:8px 12px;font-size:12px}@keyframes bytive-fade-in{0%{opacity:0}to{opacity:1}}@keyframes bytive-slide-up{0%{opacity:.6;transform:translateY(100%)}to{opacity:1;transform:translateY(0)}}@keyframes bytive-fade-up{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes bytive-pulse{0%,to{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}@keyframes bytive-scan-line{0%{top:-10%}to{top:110%}}.bytive-refine-overlay{pointer-events:none;position:absolute;inset:0;overflow:hidden}.bytive-refine-overlay:before{content:"";background:linear-gradient(90deg, transparent, var(--accent), transparent);height:3px;animation:2.4s ease-in-out infinite bytive-scan-line;position:absolute;left:0;right:0;box-shadow:0 0 30px 8px #7a1c3b66}.bytive-refine-status{color:#fff;background:linear-gradient(#0000,#000000bf);padding:24px 16px 16px;font-size:12px;font-weight:500;position:absolute;inset:auto 0 0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}`;
var ID = "bytive-tryon-styles";
if (typeof document !== "undefined" && !document.getElementById(ID)) {
  const style = document.createElement("style");
  style.id = ID;
  style.textContent = css;
  document.head.appendChild(style);
}

// src/components/TryOnWidget.tsx
var import_react9 = require("react");

// src/hooks/useMediaPipe.ts
var import_react = require("react");

// src/lib/mediapipe.ts
var VISION_WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm";
var visionPromise = null;
var mediapipeModule = null;
async function getModule() {
  if (!mediapipeModule) {
    mediapipeModule = await import("@mediapipe/tasks-vision");
  }
  return mediapipeModule;
}
async function getVision() {
  if (!visionPromise) {
    const mp = await getModule();
    visionPromise = mp.FilesetResolver.forVisionTasks(VISION_WASM_URL);
  }
  return visionPromise;
}
function isGpuContextError(err) {
  const msg = err instanceof Error ? err.message : String(err);
  return /webgl|kGpuService|GpuService/i.test(msg);
}
async function createWithFallback(build, label) {
  try {
    return await build("GPU");
  } catch (err) {
    if (!isGpuContextError(err)) throw err;
    console.warn(`[MediaPipe] GPU delegate unavailable for ${label}, falling back to CPU:`, err);
    return build("CPU");
  }
}
async function createFaceLandmarker() {
  const [mp, vision] = await Promise.all([getModule(), getVision()]);
  return createWithFallback(
    (delegate) => mp.FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate
      },
      runningMode: "VIDEO",
      numFaces: 1,
      outputFaceBlendshapes: false,
      outputFacialTransformationMatrixes: true
    }),
    "FaceLandmarker"
  );
}
async function createHandLandmarker() {
  const [mp, vision] = await Promise.all([getModule(), getVision()]);
  return createWithFallback(
    (delegate) => mp.HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        delegate
      },
      runningMode: "VIDEO",
      numHands: 2
    }),
    "HandLandmarker"
  );
}
async function createPoseLandmarker() {
  const [mp, vision] = await Promise.all([getModule(), getVision()]);
  return createWithFallback(
    (delegate) => mp.PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
        delegate
      },
      runningMode: "VIDEO"
    }),
    "PoseLandmarker"
  );
}

// src/hooks/useMediaPipe.ts
function decomposeMatrix(m) {
  const r00 = m[0], r10 = m[1], r20 = m[2];
  const r01 = m[4], r11 = m[5], r21 = m[6];
  const r02 = m[8], r12 = m[9], r22 = m[10];
  const sinP = -r12;
  const pitch = Math.asin(Math.max(-1, Math.min(1, sinP)));
  let yaw;
  let roll;
  if (Math.abs(sinP) < 0.9999) {
    yaw = Math.atan2(r02, r22);
    roll = Math.atan2(r10, r11);
  } else {
    yaw = Math.atan2(-r20, r00);
    roll = 0;
  }
  return { yaw, pitch, roll };
}
function getRequiredModels(jewelryType) {
  switch (jewelryType) {
    case "necklace":
      return { face: true, hand: false, pose: true };
    case "earring":
      return { face: true, hand: false, pose: false };
    case "ring":
    case "bracelet":
      return { face: false, hand: true, pose: false };
    default:
      return { face: false, hand: false, pose: false };
  }
}
function useMediaPipe() {
  const faceLandmarkerRef = (0, import_react.useRef)(null);
  const handLandmarkerRef = (0, import_react.useRef)(null);
  const poseLandmarkerRef = (0, import_react.useRef)(null);
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const loadedModelsRef = (0, import_react.useRef)({
    face: false,
    hand: false,
    pose: false
  });
  const loadModels = (0, import_react.useCallback)(async (jewelryType) => {
    const required = getRequiredModels(jewelryType);
    const toLoad = [];
    const allLoaded = (!required.face || loadedModelsRef.current.face) && (!required.hand || loadedModelsRef.current.hand) && (!required.pose || loadedModelsRef.current.pose);
    if (allLoaded) {
      console.log("[MediaPipe] All required models already loaded");
      return;
    }
    console.log("[MediaPipe] Loading models...", { required, loaded: { ...loadedModelsRef.current } });
    setIsLoading(true);
    setError(null);
    try {
      if (required.face && !loadedModelsRef.current.face) {
        console.log("[MediaPipe] Loading FaceLandmarker...");
        toLoad.push(
          createFaceLandmarker().then((lm) => {
            faceLandmarkerRef.current = lm;
            loadedModelsRef.current.face = true;
            console.log("[MediaPipe] FaceLandmarker loaded");
          })
        );
      }
      if (required.hand && !loadedModelsRef.current.hand) {
        console.log("[MediaPipe] Loading HandLandmarker...");
        toLoad.push(
          createHandLandmarker().then((lm) => {
            handLandmarkerRef.current = lm;
            loadedModelsRef.current.hand = true;
            console.log("[MediaPipe] HandLandmarker loaded");
          })
        );
      }
      if (required.pose && !loadedModelsRef.current.pose) {
        console.log("[MediaPipe] Loading PoseLandmarker...");
        toLoad.push(
          createPoseLandmarker().then((lm) => {
            poseLandmarkerRef.current = lm;
            loadedModelsRef.current.pose = true;
            console.log("[MediaPipe] PoseLandmarker loaded");
          })
        );
      }
      await Promise.all(toLoad);
      if (runningModeRef.current === "IMAGE") {
        const align = [];
        if (faceLandmarkerRef.current) align.push(faceLandmarkerRef.current.setOptions({ runningMode: "IMAGE" }));
        if (handLandmarkerRef.current) align.push(handLandmarkerRef.current.setOptions({ runningMode: "IMAGE" }));
        if (poseLandmarkerRef.current) align.push(poseLandmarkerRef.current.setOptions({ runningMode: "IMAGE" }));
        await Promise.all(align);
      }
      console.log("[MediaPipe] All models loaded successfully");
    } catch (err) {
      console.error("[MediaPipe] Failed to load models:", err);
      setError("Failed to load detection models. Please refresh and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const lastTimestampRef = (0, import_react.useRef)(0);
  const runningModeRef = (0, import_react.useRef)("VIDEO");
  const setRunningMode = (0, import_react.useCallback)(async (mode) => {
    if (runningModeRef.current === mode) return;
    const tasks = [];
    if (faceLandmarkerRef.current) tasks.push(faceLandmarkerRef.current.setOptions({ runningMode: mode }));
    if (handLandmarkerRef.current) tasks.push(handLandmarkerRef.current.setOptions({ runningMode: mode }));
    if (poseLandmarkerRef.current) tasks.push(poseLandmarkerRef.current.setOptions({ runningMode: mode }));
    await Promise.all(tasks);
    runningModeRef.current = mode;
  }, []);
  const detectImage = (0, import_react.useCallback)(
    async (image) => {
      if (runningModeRef.current !== "IMAGE") {
        await setRunningMode("IMAGE");
      }
      let faceLandmarks = null;
      let handLandmarks = null;
      let poseLandmarks = null;
      let headPose = null;
      try {
        if (faceLandmarkerRef.current) {
          const result = faceLandmarkerRef.current.detect(image);
          if (result.faceLandmarks?.length) {
            faceLandmarks = result.faceLandmarks.map(
              (face) => face.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z }))
            );
          }
          const matrix = result.facialTransformationMatrixes?.[0]?.data;
          if (matrix) headPose = decomposeMatrix(matrix);
        }
        if (handLandmarkerRef.current) {
          const result = handLandmarkerRef.current.detect(image);
          if (result.landmarks?.length) {
            handLandmarks = result.landmarks.map(
              (hand) => hand.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z }))
            );
          }
        }
        if (poseLandmarkerRef.current) {
          const result = poseLandmarkerRef.current.detect(image);
          if (result.landmarks?.length) {
            poseLandmarks = result.landmarks.map(
              (pose) => pose.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z, visibility: lm.visibility }))
            );
          }
        }
      } catch (err) {
        console.error("[MediaPipe] Image detection failed:", err);
        return null;
      }
      return { faceLandmarks, handLandmarks, poseLandmarks, headPose };
    },
    [setRunningMode]
  );
  const detect = (0, import_react.useCallback)(
    (video) => {
      let timestamp = performance.now();
      if (timestamp <= lastTimestampRef.current) {
        timestamp = lastTimestampRef.current + 1;
      }
      lastTimestampRef.current = timestamp;
      let faceLandmarks = null;
      let handLandmarks = null;
      let poseLandmarks = null;
      let headPose = null;
      try {
        if (faceLandmarkerRef.current) {
          const result = faceLandmarkerRef.current.detectForVideo(
            video,
            timestamp
          );
          if (result.faceLandmarks?.length) {
            faceLandmarks = result.faceLandmarks.map(
              (face) => face.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z }))
            );
          }
          const matrix = result.facialTransformationMatrixes?.[0]?.data;
          if (matrix) headPose = decomposeMatrix(matrix);
        }
        if (handLandmarkerRef.current) {
          const result = handLandmarkerRef.current.detectForVideo(
            video,
            timestamp
          );
          if (result.landmarks?.length) {
            handLandmarks = result.landmarks.map(
              (hand) => hand.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z }))
            );
          }
        }
        if (poseLandmarkerRef.current) {
          const result = poseLandmarkerRef.current.detectForVideo(
            video,
            timestamp
          );
          if (result.landmarks?.length) {
            poseLandmarks = result.landmarks.map(
              (pose) => pose.map((lm) => ({ x: lm.x, y: lm.y, z: lm.z, visibility: lm.visibility }))
            );
          }
        }
      } catch {
        return null;
      }
      return { faceLandmarks, handLandmarks, poseLandmarks, headPose };
    },
    []
  );
  (0, import_react.useEffect)(() => {
    return () => {
      faceLandmarkerRef.current?.close();
      handLandmarkerRef.current?.close();
      poseLandmarkerRef.current?.close();
    };
  }, []);
  return { detect, detectImage, setRunningMode, isLoading, error, loadModels };
}

// src/hooks/useJewelryOverlay.ts
var import_react2 = require("react");

// src/types/jewelry.ts
var NECKLACE_PLACEMENT_OFFSET = {
  collar: 0.1,
  // 12–13" — very tight, base of neck
  choker: 0.18,
  // 14–16" — snug on the neck
  princess: 0.3,
  // 17–19" — collarbone / suprasternal notch
  matinee: 0.55,
  // 20–24" — upper chest, just below collarbone
  opera: 0.8,
  // 28–34" — mid-chest, hangs onto sternum
  rope: 1.05,
  // 35"+ — past mid-chest
  lariat: 1.1,
  // open-end, drops far
  layered: 0.25,
  // multi-strand top crosses neck base, lower strands fan out
  yPendant: 0.32
  // chains converge to a pendant at upper sternum
};
var BRACELET_FOREARM_SHIFT = {
  watch: 0.05,
  // sits on the wrist crease (where a watch face goes)
  tennis: 0.12,
  // snug just above the crease
  bangle: 0.22,
  // at the wrist bone — default for most bangles
  cuff: 0.4
  // high cuff, sits up on the forearm
};
var BRACELET_WIDTH_RATIO = {
  watch: 0.72,
  tennis: 0.68,
  bangle: 0.7,
  cuff: 0.78
};
var EARRING_LOBE_SHIFT = {
  stud: 0.04,
  huggie: 0.04,
  hoop: 0.05,
  drop: 0.06,
  chandelier: 0.06,
  jacket: 0.05,
  threader: 0.07,
  climber: -0.02,
  // anchors above the lobe — climbs the helix
  cuff: -0.03,
  // clips above the tragion on the cartilage
  tassel: 0.06,
  statement: 0.04
};
var FINGER_MCP_INDEX = {
  thumb: 2,
  index: 5,
  middle: 9,
  ring: 13,
  pinky: 17
};

// src/lib/landmarkUtils.ts
function dist2D(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}
function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
var FACE_FALLBACK_BELOW_CHIN = {
  collar: 0.08,
  // 12–13" — flat at neck base
  choker: 0.15,
  // 14–16" — high on the neck
  princess: 0.3,
  // 17–19" — collarbone / suprasternal notch
  matinee: 0.55,
  // 20–24" — upper chest
  opera: 0.85,
  // 28–34" — mid-chest
  rope: 1.1,
  // 35"+ — past mid-chest
  lariat: 1.15,
  // open-end drop
  layered: 0.25,
  // multi-strand bib — top V crosses the neck base
  yPendant: 0.32
  // pendant Y at upper sternum
};
var NECKLACE_WIDTH_PER_FACE_WIDTH = 1.25;
function sortByX(a, b) {
  return a.x <= b.x ? { left: a, right: b } : { left: b, right: a };
}
function getNecklaceAnchors(faceLandmarks, poseLandmarks, placement = "princess") {
  if (!faceLandmarks || faceLandmarks.length <= 356) return null;
  const chin = faceLandmarks[152];
  const forehead = faceLandmarks[10];
  const leftEdge = faceLandmarks[127];
  const rightEdge = faceLandmarks[356];
  const faceDx = chin.x - forehead.x;
  const faceDy = chin.y - forehead.y;
  const faceHeight = Math.hypot(faceDx, faceDy);
  const faceWidth = Math.abs(rightEdge.x - leftEdge.x);
  if (faceHeight < 1e-6 || faceWidth < 1e-6) return null;
  const width = faceWidth * NECKLACE_WIDTH_PER_FACE_WIDTH;
  if (poseLandmarks && poseLandmarks.length >= 13) {
    const a = poseLandmarks[11];
    const b = poseLandmarks[12];
    const av = a.visibility ?? 1;
    const bv = b.visibility ?? 1;
    if (av > 0.5 && bv > 0.5) {
      const sorted = sortByX(a, b);
      const left = sorted.left;
      const right = sorted.right;
      const shoulderMidY = (left.y + right.y) / 2;
      if (shoulderMidY - chin.y > faceHeight * 0.3) {
        const shoulderMidX = (left.x + right.x) / 2;
        const placementFactor = NECKLACE_PLACEMENT_OFFSET[placement];
        const centerY2 = chin.y + (shoulderMidY - chin.y) * placementFactor;
        const centerX2 = chin.x * 0.4 + shoulderMidX * 0.6;
        const rotation2 = Math.atan2(right.y - left.y, right.x - left.x);
        return { center: { x: centerX2, y: centerY2 }, width, rotation: rotation2 };
      }
    }
  }
  const downX = faceDx / faceHeight;
  const downY = faceDy / faceHeight;
  const expectedFaceHeight = faceWidth * 1.45;
  const pitchExtra = Math.max(0, expectedFaceHeight - faceHeight);
  const drop = FACE_FALLBACK_BELOW_CHIN[placement] * faceHeight + pitchExtra;
  const centerX = chin.x + downX * drop;
  const centerY = chin.y + downY * drop;
  const rotation = Math.atan2(-downX, downY);
  return { center: { x: centerX, y: centerY }, width, rotation };
}
function getEarringAnchors(faceLandmarks, earringStyle = "drop", headPose = null) {
  if (!faceLandmarks || faceLandmarks.length < 468) return null;
  const leftEar = faceLandmarks[234];
  const rightEar = faceLandmarks[454];
  const forehead = faceLandmarks[10];
  const chin = faceLandmarks[152];
  const noseTip = faceLandmarks[1];
  const leftEdge = faceLandmarks[127];
  const rightEdge = faceLandmarks[356];
  const faceWidth = Math.abs(rightEdge.x - leftEdge.x);
  const faceHeight = dist2D(forehead, chin);
  if (faceHeight < 1e-6 || faceWidth < 1e-6) return null;
  const downX = (chin.x - forehead.x) / faceHeight;
  const downY = (chin.y - forehead.y) / faceHeight;
  const lateralX = downY;
  const lateralY = -downX;
  const lobeShift = EARRING_LOBE_SHIFT[earringStyle] ?? 0.06;
  const lobeDownX = downX * faceHeight * lobeShift;
  const lobeDownY = downY * faceHeight * lobeShift;
  const outward = faceWidth * 0.015;
  let yawSigned;
  let turnMag;
  if (headPose && Number.isFinite(headPose.yaw)) {
    yawSigned = headPose.yaw;
    turnMag = Math.min(1, Math.abs(yawSigned) / 0.44);
  } else {
    const earSpanX = rightEar.x - leftEar.x || 1e-6;
    yawSigned = (noseTip.x - leftEar.x) / earSpanX - 0.5;
    turnMag = Math.min(1, Math.abs(yawSigned) / 0.3);
  }
  const farFade = 1 - smoothstep(0.35, 0.85, turnMag);
  const leftIsFar = yawSigned < 0;
  const leftOpacity = leftIsFar ? farFade : 1;
  const rightOpacity = leftIsFar ? 1 : farFade;
  const inwardPull = 0.55 * turnMag;
  const leftPull = leftIsFar ? inwardPull : 0;
  const rightPull = leftIsFar ? 0 : inwardPull;
  const tilt = headPose && Number.isFinite(headPose.roll) ? headPose.roll : Math.atan2(rightEar.y - leftEar.y, rightEar.x - leftEar.x);
  const lerp = (a, b, t) => a + (b - a) * t;
  return {
    left: {
      x: lerp(leftEar.x, noseTip.x, leftPull) - lateralX * outward + lobeDownX,
      y: lerp(leftEar.y, noseTip.y, leftPull) - lateralY * outward + lobeDownY
    },
    right: {
      x: lerp(rightEar.x, noseTip.x, rightPull) + lateralX * outward + lobeDownX,
      y: lerp(rightEar.y, noseTip.y, rightPull) + lateralY * outward + lobeDownY
    },
    faceWidth,
    faceHeight,
    tilt,
    leftOpacity,
    rightOpacity
  };
}
function getRingAnchors(handLandmarks, finger = "ring", position = "base") {
  if (!handLandmarks || handLandmarks.length < 21) return null;
  const mcpIdx = FINGER_MCP_INDEX[finger];
  const pipIdx = mcpIdx + 1;
  const dipIdx = mcpIdx + 2;
  const tipIdx = mcpIdx + 3;
  const lastIdx = handLandmarks.length - 1;
  const safe = (i) => handLandmarks[Math.min(i, lastIdx)];
  let p0, p1, t;
  switch (position) {
    case "base":
      p0 = safe(mcpIdx);
      p1 = safe(pipIdx);
      t = 0.25;
      break;
    case "mid":
      p0 = safe(mcpIdx);
      p1 = safe(pipIdx);
      t = 0.55;
      break;
    case "midi":
      p0 = safe(pipIdx);
      p1 = safe(dipIdx);
      t = 0.5;
      break;
    case "tip":
      p0 = safe(dipIdx);
      p1 = safe(tipIdx);
      t = 0.5;
      break;
  }
  const center = {
    x: p0.x + (p1.x - p0.x) * t,
    y: p0.y + (p1.y - p0.y) * t,
    z: (p0.z ?? 0) + ((p1.z ?? 0) - (p0.z ?? 0)) * t
  };
  const indexBase = handLandmarks[5];
  const pinkyBase = handLandmarks[17];
  const palmDiag3D = Math.hypot(
    indexBase.x - pinkyBase.x,
    indexBase.y - pinkyBase.y,
    (indexBase.z ?? 0) - (pinkyBase.z ?? 0)
  );
  const palmDiag2D = dist2D(indexBase, pinkyBase);
  const handFacing = palmDiag3D > 1e-6 ? palmDiag2D / palmDiag3D : 1;
  const mcp = safe(mcpIdx);
  let fingerWidth;
  if (finger === "ring") {
    const mid = handLandmarks[9];
    const a3D = Math.hypot(mid.x - mcp.x, mid.y - mcp.y, (mid.z ?? 0) - (mcp.z ?? 0));
    const b3D = Math.hypot(mcp.x - pinkyBase.x, mcp.y - pinkyBase.y, (mcp.z ?? 0) - (pinkyBase.z ?? 0));
    fingerWidth = (a3D + b3D) / 2;
  } else if (finger === "thumb") {
    fingerWidth = Math.hypot(
      indexBase.x - mcp.x,
      indexBase.y - mcp.y,
      (indexBase.z ?? 0) - (mcp.z ?? 0)
    ) * 0.6;
  } else {
    const neighborIdx = finger === "pinky" ? 13 : mcpIdx + 4;
    const neighbor = handLandmarks[Math.max(2, Math.min(neighborIdx, lastIdx))];
    fingerWidth = Math.hypot(
      neighbor.x - mcp.x,
      neighbor.y - mcp.y,
      (neighbor.z ?? 0) - (mcp.z ?? 0)
    );
  }
  const phalanxScale = position === "midi" ? 0.85 : position === "tip" ? 0.72 : 0.78;
  fingerWidth *= phalanxScale;
  fingerWidth *= handFacing;
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const rotation = Math.atan2(dy, dx) - Math.PI / 2;
  const opacity = smoothstep(0.25, 0.7, handFacing);
  return { center, width: fingerWidth, rotation, opacity };
}
function getBraceletAnchors(handLandmarks, style = "bangle") {
  if (!handLandmarks || handLandmarks.length < 21) return null;
  const wrist = handLandmarks[0];
  const indexBase = handLandmarks[5];
  const pinkyBase = handLandmarks[17];
  const palmWidth2D = dist2D(indexBase, pinkyBase);
  const palmWidth3D = Math.hypot(
    indexBase.x - pinkyBase.x,
    indexBase.y - pinkyBase.y,
    (indexBase.z ?? 0) - (pinkyBase.z ?? 0)
  );
  const handFacing = palmWidth3D > 1e-6 ? palmWidth2D / palmWidth3D : 1;
  const wristWidth = palmWidth3D * BRACELET_WIDTH_RATIO[style] * handFacing;
  const palmCenterX = (indexBase.x + pinkyBase.x) / 2;
  const palmCenterY = (indexBase.y + pinkyBase.y) / 2;
  const handDx = palmCenterX - wrist.x;
  const handDy = palmCenterY - wrist.y;
  const handLen = Math.hypot(handDx, handDy) || 1;
  const forearmShift = BRACELET_FOREARM_SHIFT[style];
  const center = {
    x: wrist.x - handDx / handLen * (handLen * forearmShift),
    y: wrist.y - handDy / handLen * (handLen * forearmShift)
  };
  const rotation = Math.atan2(handDy, handDx) - Math.PI / 2;
  const opacity = smoothstep(0.25, 0.7, handFacing);
  return { center, width: wristWidth, rotation, opacity };
}

// src/lib/overlayRenderer.ts
var SHADOW_COLOR = "rgba(0, 0, 0, 0.35)";
var SHADOW_BLUR = 6;
var SHADOW_OFFSET_Y = 4;
function applyShadow(ctx, offsetY = SHADOW_OFFSET_Y) {
  ctx.shadowColor = SHADOW_COLOR;
  ctx.shadowBlur = SHADOW_BLUR;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = offsetY;
}
function drawJewelryOverlay(ctx, jewelryImage, anchor, config, canvasWidth, canvasHeight) {
  const { center, width, rotation, opacity } = anchor;
  const handAlpha = opacity ?? 1;
  if (handAlpha <= 0.02) return;
  const px = center.x * canvasWidth;
  const py = center.y * canvasHeight;
  const drawWidth = width * canvasWidth * config.scaleFactor;
  const aspectRatio = jewelryImage.height / jewelryImage.width;
  const drawHeight = drawWidth * aspectRatio;
  const offsetPx = config.offsetX * canvasWidth;
  const offsetPy = config.offsetY * canvasHeight;
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.globalAlpha = 0.97 * handAlpha;
  applyShadow(ctx);
  ctx.translate(px + offsetPx, py + offsetPy);
  ctx.rotate(rotation);
  ctx.drawImage(
    jewelryImage,
    -drawWidth / 2,
    -drawHeight / 2,
    drawWidth,
    drawHeight
  );
  ctx.restore();
}
function drawNecklaceOverlay(ctx, jewelryImage, anchor, config, canvasWidth, canvasHeight) {
  const { center, width, rotation } = anchor;
  const px = center.x * canvasWidth;
  const py = center.y * canvasHeight;
  const drawWidth = width * canvasWidth * config.scaleFactor;
  const aspectRatio = jewelryImage.height / jewelryImage.width;
  const drawHeight = drawWidth * aspectRatio;
  const offsetPx = config.offsetX * canvasWidth;
  const offsetPy = config.offsetY * canvasHeight;
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.globalAlpha = 0.96;
  applyShadow(ctx);
  ctx.translate(px + offsetPx, py + offsetPy);
  ctx.rotate(rotation);
  ctx.drawImage(
    jewelryImage,
    -drawWidth / 2,
    0,
    drawWidth,
    drawHeight
  );
  ctx.restore();
}
function drawEarringOverlay(ctx, jewelryImage, anchors, config, canvasWidth, canvasHeight) {
  const earringWidth = anchors.faceWidth * canvasWidth * config.scaleFactor;
  const aspectRatio = jewelryImage.height / jewelryImage.width;
  const earringHeight = earringWidth * aspectRatio;
  const offsetPx = config.offsetX * canvasWidth;
  const offsetPy = config.offsetY * canvasHeight;
  const tilt = anchors.tilt;
  const drawOne = (cx, cy, flip, alpha) => {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.globalAlpha = 0.97 * alpha;
    applyShadow(ctx);
    ctx.translate(cx, cy);
    ctx.rotate(tilt);
    if (flip) ctx.scale(-1, 1);
    const squish = 0.6 + 0.4 * alpha;
    ctx.scale(squish, 1);
    ctx.drawImage(
      jewelryImage,
      -earringWidth / 2,
      0,
      earringWidth,
      earringHeight
    );
    ctx.restore();
  };
  drawOne(
    anchors.left.x * canvasWidth + offsetPx,
    anchors.left.y * canvasHeight + offsetPy,
    false,
    anchors.leftOpacity
  );
  drawOne(
    anchors.right.x * canvasWidth - offsetPx,
    anchors.right.y * canvasHeight + offsetPy,
    true,
    anchors.rightOpacity
  );
}

// src/hooks/useJewelryOverlay.ts
var SIZE_MIN = 0.5;
var SIZE_MAX = 1.6;
var SMOOTH_ALPHA = 0.45;
function ema(prev, next, alpha = SMOOTH_ALPHA) {
  if (prev === void 0 || !Number.isFinite(prev)) return next;
  return prev + (next - prev) * alpha;
}
function emaAngle(prev, next, alpha = SMOOTH_ALPHA) {
  if (prev === void 0 || !Number.isFinite(prev)) return next;
  let diff = next - prev;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  while (diff < -Math.PI) diff += 2 * Math.PI;
  return prev + diff * alpha;
}
function smoothAnchor(cache, key, fresh) {
  const prev = cache.get(key);
  const smoothed = {
    center: {
      x: ema(prev?.center.x, fresh.center.x),
      y: ema(prev?.center.y, fresh.center.y),
      z: fresh.center.z
    },
    width: ema(prev?.width, fresh.width),
    rotation: emaAngle(prev?.rotation, fresh.rotation),
    opacity: fresh.opacity !== void 0 ? ema(prev?.opacity, fresh.opacity) : void 0
  };
  cache.set(key, smoothed);
  return smoothed;
}
function smoothEarring(cache, key, fresh) {
  const prev = cache.get(key);
  const smoothed = {
    left: {
      x: ema(prev?.left.x, fresh.left.x),
      y: ema(prev?.left.y, fresh.left.y)
    },
    right: {
      x: ema(prev?.right.x, fresh.right.x),
      y: ema(prev?.right.y, fresh.right.y)
    },
    faceWidth: ema(prev?.faceWidth, fresh.faceWidth),
    faceHeight: ema(prev?.faceHeight, fresh.faceHeight),
    tilt: emaAngle(prev?.tilt, fresh.tilt),
    leftOpacity: ema(prev?.leftOpacity, fresh.leftOpacity),
    rightOpacity: ema(prev?.rightOpacity, fresh.rightOpacity)
  };
  cache.set(key, smoothed);
  return smoothed;
}
function useJewelryOverlay() {
  const canvasRef = (0, import_react2.useRef)(null);
  const [selectedItems, setSelectedItems] = (0, import_react2.useState)(/* @__PURE__ */ new Map());
  const [sizeMultipliers, setSizeMultipliers] = (0, import_react2.useState)(/* @__PURE__ */ new Map());
  const [nudgeOffsets, setNudgeOffsets] = (0, import_react2.useState)(/* @__PURE__ */ new Map());
  const [imagesLoadVersion, setImagesLoadVersion] = (0, import_react2.useState)(0);
  const jewelryImagesRef = (0, import_react2.useRef)(/* @__PURE__ */ new Map());
  const selectedItemsRef = (0, import_react2.useRef)(selectedItems);
  const sizeMultipliersRef = (0, import_react2.useRef)(sizeMultipliers);
  const nudgeOffsetsRef = (0, import_react2.useRef)(nudgeOffsets);
  const anchorCacheRef = (0, import_react2.useRef)(/* @__PURE__ */ new Map());
  const earringCacheRef = (0, import_react2.useRef)(/* @__PURE__ */ new Map());
  (0, import_react2.useEffect)(() => {
    selectedItemsRef.current = selectedItems;
  }, [selectedItems]);
  (0, import_react2.useEffect)(() => {
    sizeMultipliersRef.current = sizeMultipliers;
  }, [sizeMultipliers]);
  (0, import_react2.useEffect)(() => {
    nudgeOffsetsRef.current = nudgeOffsets;
  }, [nudgeOffsets]);
  (0, import_react2.useEffect)(() => {
    anchorCacheRef.current.clear();
    earringCacheRef.current.clear();
  }, [selectedItems]);
  (0, import_react2.useEffect)(() => {
    const currentIds = /* @__PURE__ */ new Set();
    selectedItems.forEach((item) => {
      currentIds.add(item.id);
      if (!jewelryImagesRef.current.has(item.id)) {
        const img = new Image();
        img.onload = () => {
          jewelryImagesRef.current.set(item.id, img);
          setImagesLoadVersion((v) => v + 1);
        };
        img.src = item.imageUrl;
      }
    });
    for (const id of jewelryImagesRef.current.keys()) {
      if (!currentIds.has(id)) {
        jewelryImagesRef.current.delete(id);
      }
    }
  }, [selectedItems]);
  const toggleJewelry = (0, import_react2.useCallback)((item) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      if (prev.get(item.type)?.id === item.id) {
        next.delete(item.type);
      } else {
        next.set(item.type, item);
      }
      return next;
    });
  }, []);
  const removeJewelry = (0, import_react2.useCallback)((type) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      next.delete(type);
      return next;
    });
  }, []);
  const clearAll = (0, import_react2.useCallback)(() => {
    setSelectedItems(/* @__PURE__ */ new Map());
    setSizeMultipliers(/* @__PURE__ */ new Map());
    setNudgeOffsets(/* @__PURE__ */ new Map());
    jewelryImagesRef.current.clear();
  }, []);
  const setSize = (0, import_react2.useCallback)((itemId, multiplier) => {
    const clamped = Math.max(SIZE_MIN, Math.min(SIZE_MAX, multiplier));
    setSizeMultipliers((prev) => {
      const next = new Map(prev);
      next.set(itemId, clamped);
      return next;
    });
  }, []);
  const nudge = (0, import_react2.useCallback)((itemId, dx, dy) => {
    setNudgeOffsets((prev) => {
      const next = new Map(prev);
      const cur = prev.get(itemId) ?? { x: 0, y: 0 };
      next.set(itemId, { x: cur.x + dx, y: cur.y + dy });
      return next;
    });
  }, []);
  const resetNudge = (0, import_react2.useCallback)((itemId) => {
    setNudgeOffsets((prev) => {
      const next = new Map(prev);
      next.delete(itemId);
      return next;
    });
  }, []);
  const hasAnySelected = selectedItems.size > 0;
  const renderFrame = (0, import_react2.useCallback)(
    (source, landmarks, mirror) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const isVideo = source instanceof HTMLVideoElement;
      const videoWidth = isVideo ? source.videoWidth : source.naturalWidth;
      const videoHeight = isVideo ? source.videoHeight : source.naturalHeight;
      if (!videoWidth || !videoHeight) return;
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      ctx.save();
      if (mirror) {
        ctx.translate(videoWidth, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(source, 0, 0, videoWidth, videoHeight);
      ctx.restore();
      if (!landmarks) return;
      const items = selectedItemsRef.current;
      const sizes = sizeMultipliersRef.current;
      const nudges = nudgeOffsetsRef.current;
      const anchorCache = anchorCacheRef.current;
      const earringCache = earringCacheRef.current;
      items.forEach((jewelry) => {
        const jewelryImg = jewelryImagesRef.current.get(jewelry.id);
        if (!jewelryImg) return;
        const mult = sizes.get(jewelry.id) ?? 1;
        const nudgeOffset = nudges.get(jewelry.id);
        const baseConfig = jewelry.overlayConfig;
        const config = {
          ...baseConfig,
          scaleFactor: baseConfig.scaleFactor * mult,
          offsetX: baseConfig.offsetX + (nudgeOffset?.x ?? 0),
          offsetY: baseConfig.offsetY + (nudgeOffset?.y ?? 0)
        };
        switch (jewelry.type) {
          case "necklace": {
            const fresh = getNecklaceAnchors(
              landmarks.faceLandmarks?.[0] ?? null,
              landmarks.poseLandmarks?.[0] ?? null,
              config.placement || "princess"
            );
            if (fresh) {
              const smoothed = smoothAnchor(anchorCache, `${jewelry.id}#nk`, fresh);
              const anchor = {
                center: { ...smoothed.center },
                width: smoothed.width,
                rotation: smoothed.rotation
              };
              if (mirror) {
                anchor.center.x = 1 - anchor.center.x;
                anchor.rotation = -anchor.rotation;
              }
              drawNecklaceOverlay(ctx, jewelryImg, anchor, config, videoWidth, videoHeight);
            }
            break;
          }
          case "earring": {
            const fresh = getEarringAnchors(
              landmarks.faceLandmarks?.[0] ?? null,
              config.earringStyle || "drop",
              landmarks.headPose
            );
            if (fresh) {
              const smoothed = smoothEarring(earringCache, `${jewelry.id}#er`, fresh);
              const anchors = {
                left: { ...smoothed.left },
                right: { ...smoothed.right },
                faceWidth: smoothed.faceWidth,
                faceHeight: smoothed.faceHeight,
                tilt: smoothed.tilt,
                leftOpacity: smoothed.leftOpacity,
                rightOpacity: smoothed.rightOpacity
              };
              if (mirror) {
                const tempX = anchors.left.x;
                const tempY = anchors.left.y;
                anchors.left.x = 1 - anchors.right.x;
                anchors.left.y = anchors.right.y;
                anchors.right.x = 1 - tempX;
                anchors.right.y = tempY;
                anchors.tilt = -anchors.tilt;
                const tempOp = anchors.leftOpacity;
                anchors.leftOpacity = anchors.rightOpacity;
                anchors.rightOpacity = tempOp;
              }
              drawEarringOverlay(ctx, jewelryImg, anchors, config, videoWidth, videoHeight);
            }
            break;
          }
          case "ring": {
            const hands = landmarks.handLandmarks;
            if (hands) {
              hands.forEach((hand, i) => {
                const fresh = getRingAnchors(
                  hand,
                  config.finger || "ring",
                  config.ringPosition || "base"
                );
                if (!fresh) return;
                const smoothed = smoothAnchor(anchorCache, `${jewelry.id}#rg-${i}`, fresh);
                const anchor = {
                  center: { ...smoothed.center },
                  width: smoothed.width,
                  rotation: smoothed.rotation,
                  opacity: smoothed.opacity
                };
                if (mirror) {
                  anchor.center.x = 1 - anchor.center.x;
                  anchor.rotation = -anchor.rotation;
                }
                drawJewelryOverlay(ctx, jewelryImg, anchor, config, videoWidth, videoHeight);
              });
            }
            break;
          }
          case "bracelet": {
            const hands = landmarks.handLandmarks;
            if (hands) {
              hands.forEach((hand, i) => {
                const fresh = getBraceletAnchors(hand, config.braceletStyle || "bangle");
                if (!fresh) return;
                const smoothed = smoothAnchor(anchorCache, `${jewelry.id}#br-${i}`, fresh);
                const anchor = {
                  center: { ...smoothed.center },
                  width: smoothed.width,
                  rotation: smoothed.rotation,
                  opacity: smoothed.opacity
                };
                if (mirror) {
                  anchor.center.x = 1 - anchor.center.x;
                  anchor.rotation = -anchor.rotation;
                }
                drawJewelryOverlay(ctx, jewelryImg, anchor, config, videoWidth, videoHeight);
              });
            }
            break;
          }
        }
      });
    },
    []
  );
  return {
    canvasRef,
    selectedItems,
    toggleJewelry,
    removeJewelry,
    clearAll,
    hasAnySelected,
    sizeMultipliers,
    setSize,
    nudgeOffsets,
    nudge,
    resetNudge,
    imagesLoadVersion,
    renderFrame
  };
}

// src/hooks/useRefine.ts
var import_react3 = require("react");

// src/lib/imageUtils.ts
function canvasToBase64(canvas) {
  return canvas.toDataURL("image/png");
}

// src/lib/config.ts
var BYTIVE_API_URL = "https://dev-try-me-backend.mkn4gr.easypanel.host/v1/try-on";

// src/hooks/useRefine.ts
function useRefine(apiKey, aiApiKey) {
  const [refinedImage, setRefinedImage] = (0, import_react3.useState)(null);
  const [isRefining, setIsRefining] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)(null);
  const refine = (0, import_react3.useCallback)(
    async (canvas, jewelryId, jewelryType) => {
      setIsRefining(true);
      setError(null);
      try {
        const userImage = canvasToBase64(canvas);
        const response = await fetch(`${BYTIVE_API_URL}/refine`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Bytive-Key": apiKey,
            "X-AI-Key": aiApiKey
          },
          body: JSON.stringify({
            userImage,
            jewelryId,
            jewelryType
          })
        });
        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          throw new Error(
            errData?.error || `Refinement failed (${response.status})`
          );
        }
        const data = await response.json();
        setRefinedImage(data.refinedImage);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to refine image"
        );
      } finally {
        setIsRefining(false);
      }
    },
    [apiKey, aiApiKey]
  );
  const clearRefined = (0, import_react3.useCallback)(() => {
    setRefinedImage(null);
    setError(null);
  }, []);
  return { refine, refinedImage, isRefining, error, clearRefined };
}

// src/types/widget.ts
var TYPE_TO_CATEGORY = {
  ring: "rings",
  necklace: "necklaces",
  earring: "earrings",
  bracelet: "bracelets"
};
var CATEGORY_LABEL = {
  rings: "Rings",
  necklaces: "Necklaces",
  earrings: "Earrings",
  bracelets: "Bracelets"
};

// src/components/Shell.tsx
var import_react4 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function Shell({ open, onClose, children }) {
  const ref = (0, import_react4.useRef)(null);
  (0, import_react4.useEffect)(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dlg.open) {
      dlg.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "dialog",
    {
      ref,
      className: "bytive-tryon bytive-dialog",
      onClose,
      onClick: (e) => {
        if (e.target === ref.current) onClose();
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bytive-shell", onClick: (e) => e.stopPropagation(), children })
    }
  );
}

// src/components/Header.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Header({ productName, onClose }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "bytive-header", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "Virtual Try-On" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bytive-subtitle", children: productName })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        type: "button",
        className: "bytive-icon-btn",
        onClick: onClose,
        "aria-label": "Close",
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "path",
          {
            d: "M3 3l8 8M11 3l-8 8",
            stroke: "currentColor",
            strokeWidth: "1.6",
            strokeLinecap: "round"
          }
        ) })
      }
    )
  ] });
}

// src/components/ModeTabs.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var TABS = [
  {
    value: "webcam",
    label: "Webcam",
    icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "1.5", y: "4.5", width: "9", height: "7", rx: "1.5", stroke: "currentColor", strokeWidth: "1.3" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M11 7l3.5-2v6L11 9z", stroke: "currentColor", strokeWidth: "1.3", strokeLinejoin: "round" })
    ] })
  },
  {
    value: "upload",
    label: "Upload",
    icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M8 2v8M5 5l3-3 3 3", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M2 11v2.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V11", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round" })
    ] })
  },
  {
    value: "hand",
    label: "Hand",
    icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "path",
      {
        d: "M5 8V3.5a1 1 0 112 0V7M7 7V2.5a1 1 0 112 0V7M9 7V3.5a1 1 0 112 0V8M11 7V4.5a1 1 0 112 0V11c0 2.2-1.8 4-4 4H7.5C5 15 3 13 3 10.5V7.5A1 1 0 015 7",
        stroke: "currentColor",
        strokeWidth: "1.3",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ) })
  }
];
function ModeTabs({ mode, onChange, handAvailable }) {
  const tabs = handAvailable ? TABS : TABS.filter((t) => t.value !== "hand");
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "bytive-segmented", role: "tablist", children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "button",
    {
      type: "button",
      role: "tab",
      "data-active": mode === tab.value,
      "aria-selected": mode === tab.value,
      onClick: () => onChange(tab.value),
      children: [
        tab.icon,
        tab.label
      ]
    },
    tab.value
  )) });
}

// src/components/CategoryChips.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function CategoryChips({ categories, active, onChange }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "bytive-chips", role: "tablist", children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "button",
    {
      type: "button",
      role: "tab",
      className: "bytive-chip",
      "data-active": active === cat,
      "aria-selected": active === cat,
      onClick: () => onChange(cat),
      children: CATEGORY_LABEL[cat]
    },
    cat
  )) });
}

// src/components/ProductGrid.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function formatPrice(price) {
  if (price == null) return "";
  return `\u20B9${price.toLocaleString("en-IN")}`;
}
function ProductGrid({ items, selectedId, onSelect }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bytive-grid", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "button",
    {
      type: "button",
      className: "bytive-card",
      "data-selected": item.id === selectedId,
      onClick: () => onSelect(item),
      children: [
        item.id === selectedId && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "bytive-check", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "11", height: "11", viewBox: "0 0 11 11", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "path",
          {
            d: "M2 5.5L4.5 8L9 3",
            stroke: "currentColor",
            strokeWidth: "1.6",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bytive-card-image", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("img", { src: item.imageUrl, alt: item.name }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bytive-card-meta", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bytive-card-name", children: item.name }),
          item.price != null && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bytive-card-price", children: formatPrice(item.price) })
        ] })
      ]
    },
    item.id
  )) });
}

// src/components/Footer.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function formatPrice2(price) {
  if (price == null) return "";
  return `\u20B9${price.toLocaleString("en-IN")}`;
}
function Footer({ item, onAddToCart }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bytive-footer", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "bytive-footer-meta-name", children: item.name }),
      item.price != null && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "bytive-footer-meta-price", children: formatPrice2(item.price) })
    ] }),
    onAddToCart && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "button",
      {
        type: "button",
        className: "bytive-btn-primary",
        onClick: () => onAddToCart(item),
        children: "Add to Cart"
      }
    )
  ] });
}

// src/components/WebcamMode.tsx
var import_react6 = require("react");

// src/hooks/useWebcam.ts
var import_react5 = require("react");
function useWebcam() {
  const videoRef = (0, import_react5.useRef)(null);
  const streamRef = (0, import_react5.useRef)(null);
  const [isStreaming, setIsStreaming] = (0, import_react5.useState)(false);
  const [error, setError] = (0, import_react5.useState)(null);
  const start = (0, import_react5.useCallback)(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setError("Camera access denied. Please allow camera permissions.");
      } else if (err instanceof DOMException && err.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else {
        setError("Failed to access camera.");
      }
      setIsStreaming(false);
    }
  }, []);
  const stop = (0, import_react5.useCallback)(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);
  (0, import_react5.useEffect)(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  return { videoRef, isStreaming, error, start, stop };
}

// src/components/WebcamMode.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function WebcamMode({
  canvasRef,
  detect,
  setRunningMode,
  renderFrame,
  hasAnySelected,
  onError,
  isActive,
  isRefining,
  refiningSnapshot
}) {
  const { videoRef, isStreaming, error, start, stop } = useWebcam();
  const animFrameRef = (0, import_react6.useRef)(0);
  const isRunningRef = (0, import_react6.useRef)(false);
  const detectRef = (0, import_react6.useRef)(detect);
  const renderFrameRef = (0, import_react6.useRef)(renderFrame);
  detectRef.current = detect;
  renderFrameRef.current = renderFrame;
  (0, import_react6.useEffect)(() => {
    setRunningMode("VIDEO").catch(() => {
    });
    return () => stop();
  }, [setRunningMode, stop]);
  (0, import_react6.useEffect)(() => {
    if (!isActive) stop();
  }, [isActive, stop]);
  (0, import_react6.useEffect)(() => {
    if (error && onError) onError(error);
  }, [error, onError]);
  (0, import_react6.useEffect)(() => {
    if (!isStreaming || !hasAnySelected) {
      isRunningRef.current = false;
      return;
    }
    isRunningRef.current = true;
    let lastLandmarks = null;
    const loop = () => {
      if (!isRunningRef.current) return;
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        try {
          const fresh = detectRef.current(video);
          if (fresh) lastLandmarks = fresh;
        } catch {
        }
        renderFrameRef.current(video, lastLandmarks, true);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      isRunningRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isStreaming, hasAnySelected, videoRef]);
  const showRawVideo = !hasAnySelected;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bytive-preview", children: [
    !isStreaming && !isRefining && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bytive-preview-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", stroke: "currentColor", strokeWidth: "1.6" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: "M16 10l5-3v10l-5-3z", stroke: "currentColor", strokeWidth: "1.6", strokeLinejoin: "round" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("strong", { children: "Camera ready" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: "Allow access to start your live preview" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "button",
        {
          type: "button",
          className: "bytive-btn-primary",
          onClick: start,
          style: { marginTop: 8 },
          children: "Enable Camera"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "video",
      {
        ref: videoRef,
        playsInline: true,
        muted: true,
        style: {
          display: !isRefining && isStreaming && showRawVideo ? "block" : "none",
          transform: showRawVideo ? "scaleX(-1)" : void 0
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "canvas",
      {
        ref: canvasRef,
        style: { display: !isRefining && isStreaming && !showRawVideo ? "block" : "none" }
      }
    ),
    !isRefining && isStreaming && hasAnySelected && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "bytive-tracking-pill", children: "Tracking" }),
    isRefining && refiningSnapshot && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "img",
        {
          src: refiningSnapshot,
          alt: "",
          style: { width: "100%", height: "100%", objectFit: "cover" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "bytive-refine-overlay", "aria-hidden": true }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "bytive-refine-status", children: "Enhancing with AI\u2026" })
    ] })
  ] });
}

// src/components/UploadMode.tsx
var import_react7 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
function UploadMode({
  canvasRef,
  detectImage,
  setRunningMode,
  renderFrame,
  hasAnySelected,
  isModelLoading,
  isRefining,
  refiningSnapshot,
  reRenderKey
}) {
  const [uploadedImage, setUploadedImage] = (0, import_react7.useState)(null);
  const renderFrameRef = (0, import_react7.useRef)(renderFrame);
  renderFrameRef.current = renderFrame;
  (0, import_react7.useEffect)(() => {
    setRunningMode("IMAGE").catch(() => {
    });
  }, [setRunningMode]);
  (0, import_react7.useEffect)(() => {
    if (!uploadedImage) return;
    let cancelled = false;
    (async () => {
      renderFrameRef.current(uploadedImage, null, false);
      if (!hasAnySelected || isModelLoading) return;
      try {
        const landmarks = await detectImage(uploadedImage);
        if (cancelled) return;
        renderFrameRef.current(uploadedImage, landmarks, false);
      } catch (err) {
        console.error("[UploadMode] detection failed:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [uploadedImage, hasAnySelected, isModelLoading, detectImage, reRenderKey]);
  const [isDragging, setIsDragging] = (0, import_react7.useState)(false);
  const loadFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const img = new Image();
    img.onload = () => setUploadedImage(img);
    img.src = URL.createObjectURL(file);
  };
  const handleUpload = (e) => {
    loadFile(e.target.files?.[0]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    loadFile(e.dataTransfer.files?.[0]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children: !uploadedImage ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "bytive-preview bytive-preview-empty-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "label",
    {
      className: `bytive-dropzone-area${isDragging ? " bytive-dropzone-active" : ""}`,
      onDrop: handleDrop,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("input", { type: "file", accept: "image/*", onChange: handleUpload, hidden: true }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "bytive-dropzone-icon-lg", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M12 4v12M7 9l5-5 5 5", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { d: "M3 16v3a2 2 0 002 2h14a2 2 0 002-2v-3", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("strong", { children: "Click to upload or drop a photo" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: "JPG / PNG \xB7 up to 10MB" })
      ]
    }
  ) }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { style: { padding: "0 20px 8px" }, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "button",
      {
        type: "button",
        className: "bytive-btn-secondary",
        onClick: () => setUploadedImage(null),
        style: { width: "100%" },
        children: "Back"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "bytive-preview bytive-preview-fit", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "canvas",
        {
          ref: canvasRef,
          style: { display: isRefining ? "none" : void 0 }
        }
      ),
      isRefining && refiningSnapshot && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "img",
          {
            src: refiningSnapshot,
            alt: "",
            style: { width: "100%", height: "100%", objectFit: "cover" }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "bytive-refine-overlay", "aria-hidden": true }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "bytive-refine-status", children: "Enhancing with AI\u2026" })
      ] })
    ] })
  ] }) });
}

// src/components/HandMode.tsx
var import_react8 = require("react");

// src/assets/dark.webp
var dark_default = "data:image/webp;base64,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";

// src/assets/medium.webp
var medium_default = "data:image/webp;base64,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";

// src/assets/light.webp
var light_default = "data:image/webp;base64,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";

// src/lib/handAssets.ts
var HAND_TONES = [light_default, medium_default, dark_default];

// src/components/HandMode.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function pickToneOpacities(value) {
  return {
    medium: Math.min(1, value / 50),
    dark: Math.max(0, (value - 50) / 50)
  };
}
var HAND_PHOTO_RING_SCALE = 1.35;
var HAND_PHOTO_RING_OFFSET_Y = -8e-3;
var HAND_PHOTO_BRACELET_SCALE = 1.15;
function HandMode({
  handImageUrls,
  item,
  detectImage,
  setRunningMode,
  isModelLoading
}) {
  const [tone, setTone] = (0, import_react8.useState)(50);
  const tones = handImageUrls || HAND_TONES;
  const opacities = pickToneOpacities(tone);
  const canvasRef = (0, import_react8.useRef)(null);
  const handImagesRef = (0, import_react8.useRef)({ light: null, medium: null, dark: null });
  const [imagesReady, setImagesReady] = (0, import_react8.useState)(false);
  const [landmarks, setLandmarks] = (0, import_react8.useState)(null);
  const [jewelryImg, setJewelryImg] = (0, import_react8.useState)(null);
  (0, import_react8.useEffect)(() => {
    setRunningMode("IMAGE").catch(() => {
    });
  }, [setRunningMode]);
  (0, import_react8.useEffect)(() => {
    let cancelled = false;
    setImagesReady(false);
    const urls = [tones[0], tones[1], tones[2]];
    Promise.all(
      urls.map(
        (url) => new Promise((resolve) => {
          if (!url) return resolve(null);
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = url;
        })
      )
    ).then((imgs) => {
      if (cancelled) return;
      handImagesRef.current = {
        light: imgs[0],
        medium: imgs[1],
        dark: imgs[2]
      };
      setImagesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [tones[0], tones[1], tones[2]]);
  (0, import_react8.useEffect)(() => {
    if (!imagesReady || isModelLoading) return;
    const ref = handImagesRef.current.light;
    if (!ref) return;
    let cancelled = false;
    (async () => {
      try {
        const result = await detectImage(ref);
        if (!cancelled) setLandmarks(result);
      } catch (err) {
        console.error("[HandMode] detection failed:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [imagesReady, isModelLoading, detectImage]);
  (0, import_react8.useEffect)(() => {
    if (!item) {
      setJewelryImg(null);
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setJewelryImg(img);
    };
    img.src = item.imageUrl;
    return () => {
      cancelled = true;
    };
  }, [item?.id, item?.imageUrl]);
  (0, import_react8.useEffect)(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { light, medium, dark } = handImagesRef.current;
    if (!light) return;
    const w = light.naturalWidth;
    const h = light.naturalHeight;
    if (!w || !h) return;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 1;
    ctx.drawImage(light, 0, 0, w, h);
    if (medium && opacities.medium > 0) {
      ctx.globalAlpha = opacities.medium;
      ctx.drawImage(medium, 0, 0, w, h);
    }
    if (dark && opacities.dark > 0) {
      ctx.globalAlpha = opacities.dark;
      ctx.drawImage(dark, 0, 0, w, h);
    }
    ctx.globalAlpha = 1;
    if (!item || !jewelryImg || !landmarks) return;
    const hand = landmarks.handLandmarks?.[0];
    if (!hand) return;
    const baseConfig = item.overlayConfig;
    const anchor = item.type === "ring" ? getRingAnchors(
      hand,
      baseConfig.finger || "ring",
      baseConfig.ringPosition || "base"
    ) : item.type === "bracelet" ? getBraceletAnchors(hand, baseConfig.braceletStyle || "bangle") : null;
    if (!anchor) return;
    const config = item.type === "ring" ? {
      ...baseConfig,
      scaleFactor: baseConfig.scaleFactor * HAND_PHOTO_RING_SCALE,
      offsetY: baseConfig.offsetY + HAND_PHOTO_RING_OFFSET_Y
    } : item.type === "bracelet" ? {
      ...baseConfig,
      scaleFactor: baseConfig.scaleFactor * HAND_PHOTO_BRACELET_SCALE
    } : baseConfig;
    drawJewelryOverlay(ctx, jewelryImg, anchor, config, w, h);
  }, [imagesReady, opacities.medium, opacities.dark, landmarks, item, jewelryImg]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "bytive-preview", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "bytive-hand-wrap", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "bytive-hand-figure", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("canvas", { ref: canvasRef, className: "bytive-hand-canvas" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "bytive-tone-slider", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "bytive-tone-label", children: "Darker" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          "input",
          {
            type: "range",
            min: 0,
            max: 100,
            step: 1,
            value: tone,
            onChange: (e) => setTone(Number(e.target.value)),
            "aria-label": "Skin tone",
            style: {
              rotate: "180deg"
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "bytive-tone-label", children: "Lighter" })
      ] })
    ] }),
    item && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "bytive-product-pill", children: item.name })
  ] });
}

// src/components/TryOnWidget.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var CATEGORY_TO_TYPE = {
  rings: "ring",
  necklaces: "necklace",
  earrings: "earring",
  bracelets: "bracelet"
};
function TryOnWidget(props) {
  const {
    apiKey,
    aiApiKey,
    product,
    catalog,
    onAddToCart,
    handImageUrls,
    hideTrigger,
    open: openProp,
    onOpenChange
  } = props;
  const isControlled = openProp !== void 0;
  const [openInternal, setOpenInternal] = (0, import_react9.useState)(false);
  const open = isControlled ? !!openProp : openInternal;
  const setOpen = (next) => {
    if (!isControlled) setOpenInternal(next);
    onOpenChange?.(next);
  };
  const categories = (0, import_react9.useMemo)(
    () => Object.keys(catalog).filter((k) => catalog[k]?.length),
    [catalog]
  );
  const initialCategory = TYPE_TO_CATEGORY[product.type];
  const [activeCategory, setActiveCategory] = (0, import_react9.useState)(
    categories.includes(initialCategory) ? initialCategory : categories[0]
  );
  const [mode, setMode] = (0, import_react9.useState)("webcam");
  const [error, setError] = (0, import_react9.useState)(null);
  const { detect, detectImage, setRunningMode, isLoading: isModelLoading, error: modelError, loadModels } = useMediaPipe();
  const {
    canvasRef,
    selectedItems,
    toggleJewelry,
    hasAnySelected,
    renderFrame,
    sizeMultipliers,
    nudgeOffsets,
    imagesLoadVersion
  } = useJewelryOverlay();
  const { refine, refinedImage, isRefining, error: refineError, clearRefined } = useRefine(
    apiKey,
    aiApiKey || ""
  );
  const [refiningSnapshot, setRefiningSnapshot] = (0, import_react9.useState)(null);
  (0, import_react9.useEffect)(() => {
    if (!isRefining) setRefiningSnapshot(null);
  }, [isRefining]);
  const [didPreselect, setDidPreselect] = (0, import_react9.useState)(false);
  (0, import_react9.useEffect)(() => {
    if (!open || didPreselect) return;
    if (!selectedItems.has(product.type)) {
      toggleJewelry(product);
    }
    setDidPreselect(true);
  }, [open, didPreselect, product, selectedItems, toggleJewelry]);
  (0, import_react9.useEffect)(() => {
    const types = /* @__PURE__ */ new Set();
    selectedItems.forEach((item) => types.add(item.type));
    types.forEach((type) => loadModels(type));
  }, [selectedItems, loadModels]);
  (0, import_react9.useEffect)(() => {
    setError(modelError || refineError || null);
  }, [modelError, refineError]);
  const activeType = CATEGORY_TO_TYPE[activeCategory];
  const itemsInCategory = catalog[activeCategory] || [];
  const currentItem = selectedItems.get(activeType) || product;
  const selectedIdInCategory = selectedItems.get(activeType)?.id ?? null;
  const handAvailable = activeType === "ring" || activeType === "bracelet";
  const handItem = handAvailable ? currentItem : null;
  (0, import_react9.useEffect)(() => {
    if (mode === "hand" && !handAvailable) setMode("webcam");
  }, [mode, handAvailable]);
  const handleSelect = (item) => {
    clearRefined();
    toggleJewelry(item);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
    !hideTrigger && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
      "button",
      {
        type: "button",
        className: "bytive-trigger bytive-tryon",
        onClick: () => setOpen(true),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("circle", { cx: "8", cy: "8", r: "3", stroke: "currentColor", strokeWidth: "1.4" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "path",
              {
                d: "M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z",
                stroke: "currentColor",
                strokeWidth: "1.4"
              }
            )
          ] }),
          "Try It On"
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(Shell, { open, onClose: () => setOpen(false), children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Header, { productName: product.name, onClose: () => setOpen(false) }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "bytive-body", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "bytive-body-left", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ModeTabs, { mode, onChange: setMode, handAvailable }),
          error && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "bytive-error", children: error }),
          !refinedImage && mode === "webcam" && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            WebcamMode,
            {
              canvasRef,
              detect,
              setRunningMode,
              renderFrame,
              hasAnySelected,
              onError: setError,
              isActive: open,
              isRefining,
              refiningSnapshot
            }
          ),
          !refinedImage && mode === "upload" && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            UploadMode,
            {
              canvasRef,
              detectImage,
              setRunningMode,
              renderFrame,
              hasAnySelected,
              isModelLoading,
              isRefining,
              refiningSnapshot,
              reRenderKey: `${Array.from(selectedItems.values()).map((i) => i.id).join(",")}|${imagesLoadVersion}|${sizeMultipliers.size}|${nudgeOffsets.size}`
            }
          ),
          !refinedImage && mode === "hand" && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            HandMode,
            {
              handImageUrls,
              item: handItem,
              detectImage,
              setRunningMode,
              isModelLoading
            }
          ),
          refinedImage && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "bytive-preview bytive-refined-preview", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("img", { src: refinedImage, alt: "AI-refined", className: "bytive-refined-img" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "button",
              {
                type: "button",
                className: "bytive-btn-secondary bytive-refined-back",
                onClick: clearRefined,
                children: "Back"
              }
            )
          ] }),
          aiApiKey && hasAnySelected && mode !== "hand" && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: { padding: "12px 20px 8px" }, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            "button",
            {
              type: "button",
              className: "bytive-btn-secondary",
              onClick: () => {
                if (canvasRef.current && currentItem) {
                  setRefiningSnapshot(canvasRef.current.toDataURL("image/png"));
                  refine(canvasRef.current, currentItem.id, currentItem.type);
                }
              },
              disabled: isRefining,
              style: { width: "100%" },
              children: isRefining ? "Enhancing\u2026" : refinedImage ? "Refined Image" : "Refine with AI"
            }
          ) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "bytive-body-right", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            CategoryChips,
            {
              categories,
              active: activeCategory,
              onChange: setActiveCategory
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            ProductGrid,
            {
              items: itemsInCategory,
              selectedId: selectedIdInCategory,
              onSelect: handleSelect
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Footer, { item: currentItem, onAddToCart })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TryOnWidget
});
//# sourceMappingURL=index.cjs.map