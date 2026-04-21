import { useEffect } from 'react';

/**
 * Hook to preload QR images for better performance
 * @param {Array} qrUrls - Array of QR image URLs to preload
 */
export const usePreloadQR = (qrUrls = []) => {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Preload specified QR images
    qrUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [qrUrls]);
};

export default usePreloadQR;