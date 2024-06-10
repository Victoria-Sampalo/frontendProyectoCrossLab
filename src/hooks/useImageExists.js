import { useState, useEffect } from 'react';

export const useImageExists = (url) => {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setExists(true);
    img.onerror = () => setExists(false);
  }, [url]);

  return exists;
};
