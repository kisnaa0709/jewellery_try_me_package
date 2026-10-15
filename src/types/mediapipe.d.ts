declare module '@mediapipe/tasks-vision' {
  export interface FilesetResolverOptions {
    wasmBinaryPath?: string;
    wasmLoaderPath?: string;
  }

  export class FilesetResolver {
    static forVisionTasks(basePath: string): Promise<FilesetResolver>;
  }

  export interface NormalizedLandmark {
    x: number;
    y: number;
    z: number;
    visibility?: number;
  }

  export interface FaceLandmarkerResult {
    faceLandmarks: NormalizedLandmark[][];
    faceBlendshapes?: unknown[];
    facialTransformationMatrixes?: unknown[];
  }

  export interface HandLandmarkerResult {
    landmarks: NormalizedLandmark[][];
    worldLandmarks: NormalizedLandmark[][];
    handednesses: unknown[][];
  }

  export interface PoseLandmarkerResult {
    landmarks: NormalizedLandmark[][];
    worldLandmarks: NormalizedLandmark[][];
  }

  export interface BaseOptions {
    modelAssetPath?: string;
    modelAssetBuffer?: Uint8Array;
    delegate?: 'CPU' | 'GPU';
  }

  export interface FaceLandmarkerOptions {
    baseOptions: BaseOptions;
    runningMode: 'IMAGE' | 'VIDEO';
    numFaces?: number;
    minFaceDetectionConfidence?: number;
    minFacePresenceConfidence?: number;
    minTrackingConfidence?: number;
    outputFaceBlendshapes?: boolean;
    outputFacialTransformationMatrixes?: boolean;
  }

  export interface HandLandmarkerOptions {
    baseOptions: BaseOptions;
    runningMode: 'IMAGE' | 'VIDEO';
    numHands?: number;
    minHandDetectionConfidence?: number;
    minHandPresenceConfidence?: number;
    minTrackingConfidence?: number;
  }

  export interface PoseLandmarkerOptions {
    baseOptions: BaseOptions;
    runningMode: 'IMAGE' | 'VIDEO';
    numPoses?: number;
    minPoseDetectionConfidence?: number;
    minPosePresenceConfidence?: number;
    minTrackingConfidence?: number;
  }

  export class FaceLandmarker {
    static createFromOptions(
      vision: FilesetResolver,
      options: FaceLandmarkerOptions
    ): Promise<FaceLandmarker>;
    detectForVideo(
      video: HTMLVideoElement,
      timestamp: number
    ): FaceLandmarkerResult;
    detect(image: HTMLImageElement | HTMLCanvasElement): FaceLandmarkerResult;
    close(): void;
  }

  export class HandLandmarker {
    static createFromOptions(
      vision: FilesetResolver,
      options: HandLandmarkerOptions
    ): Promise<HandLandmarker>;
    detectForVideo(
      video: HTMLVideoElement,
      timestamp: number
    ): HandLandmarkerResult;
    detect(image: HTMLImageElement | HTMLCanvasElement): HandLandmarkerResult;
    close(): void;
  }

  export class PoseLandmarker {
    static createFromOptions(
      vision: FilesetResolver,
      options: PoseLandmarkerOptions
    ): Promise<PoseLandmarker>;
    detectForVideo(
      video: HTMLVideoElement,
      timestamp: number
    ): PoseLandmarkerResult;
    detect(image: HTMLImageElement | HTMLCanvasElement): PoseLandmarkerResult;
    close(): void;
  }
}
