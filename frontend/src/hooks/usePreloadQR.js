import { useEffect } from 'react';

/**
 * Hook to preload QR images for better performance
 * @param {Array} qrUrls - Array of QR image URLs to preload
 */
export const usePreloadQR = (qrUrls = []) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    qrUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [qrUrls]);
};

export default usePreloadQR;