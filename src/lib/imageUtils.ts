/**
 * Convert a canvas element to a base64 PNG string.
 */
export function canvasToBase64(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}

/**
 * Download the current canvas as an image file.
 */
export function downloadCanvasImage(
  canvas: HTMLCanvasElement,
  filename: string = 'try-on.png'
) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/**
 * Load an image from a URL and return it as an HTMLImageElement.
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Resize an image to fit within maxWidth/maxHeight while maintaining aspect ratio.
 */
export function resizeImageToFit(
  image: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  let { width, height } = image;
  if (width > maxWidth) {
    height = (height * maxWidth) / width;
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = (width * maxHeight) / height;
    height = maxHeight;
  }
  return { width: Math.round(width), height: Math.round(height) };
}
