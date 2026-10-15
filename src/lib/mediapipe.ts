// Lazy-loaded MediaPipe — nothing runs until explicitly called

const VISION_WASM_URL =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm';

let visionPromise: Promise<unknown> | null = null;
let mediapipeModule: typeof import('@mediapipe/tasks-vision') | null = null;

async function getModule() {
  if (!mediapipeModule) {
    mediapipeModule = await import('@mediapipe/tasks-vision');
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

// MediaPipe's GPU delegate needs a WebGL2 context. That can fail when:
// (a) the browser has hit its WebGL context cap (~16) — common during dev
//     HMR, where stale landmarkers from prior renders still hold contexts;
// (b) hardware acceleration is off / WebGL2 unavailable on this machine.
// Both surface as `emscripten_webgl_create_context() returned error 0`.
// CPU works everywhere (slower, but acceptable for our model sizes), so we
// retry the create-call with delegate:'CPU' when GPU init throws.
function isGpuContextError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /webgl|kGpuService|GpuService/i.test(msg);
}

async function createWithFallback<T>(
  build: (delegate: 'GPU' | 'CPU') => Promise<T>,
  label: string
): Promise<T> {
  try {
    return await build('GPU');
  } catch (err) {
    if (!isGpuContextError(err)) throw err;
    console.warn(`[MediaPipe] GPU delegate unavailable for ${label}, falling back to CPU:`, err);
    return build('CPU');
  }
}

export async function createFaceLandmarker() {
  const [mp, vision] = await Promise.all([getModule(), getVision()]);
  return createWithFallback(
    (delegate) =>
      mp.FaceLandmarker.createFromOptions(vision as InstanceType<typeof mp.FilesetResolver>, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
          delegate,
        },
        runningMode: 'VIDEO',
        numFaces: 1,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: true,
      }),
    'FaceLandmarker'
  );
}

export async function createHandLandmarker() {
  const [mp, vision] = await Promise.all([getModule(), getVision()]);
  return createWithFallback(
    (delegate) =>
      mp.HandLandmarker.createFromOptions(vision as InstanceType<typeof mp.FilesetResolver>, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate,
        },
        runningMode: 'VIDEO',
        numHands: 2,
      }),
    'HandLandmarker'
  );
}

export async function createPoseLandmarker() {
  const [mp, vision] = await Promise.all([getModule(), getVision()]);
  return createWithFallback(
    (delegate) =>
      mp.PoseLandmarker.createFromOptions(vision as InstanceType<typeof mp.FilesetResolver>, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
          delegate,
        },
        runningMode: 'VIDEO',
      }),
    'PoseLandmarker'
  );
}
