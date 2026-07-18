/**
 * Resize + compress an image file in the browser using Canvas API.
 * Returns a new File with reduced dimensions and quality.
 *
 * @param file    Original image file
 * @param maxPx   Max width or height in pixels (default 1200)
 * @param quality JPEG quality 0–1 (default 0.82)
 */
export async function resizeImage(
  file: File,
  maxPx = 1200,
  quality = 0.82
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      // Scale down if either dimension exceeds maxPx
      if (width > maxPx || height > maxPx) {
        if (width >= height) {
          height = Math.round((height / width) * maxPx);
          width = maxPx;
        } else {
          width = Math.round((width / height) * maxPx);
          height = maxPx;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(file); return; } // fallback: return original

      ctx.drawImage(img, 0, 0, width, height);

      // Always output as JPEG for consistent compression
      // (PNG with transparency becomes white background — acceptable for product photos)
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          const resized = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, ".jpg"),
            { type: "image/jpeg" }
          );
          resolve(resized);
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Failed to load image")); };
    img.src = url;
  });
}
