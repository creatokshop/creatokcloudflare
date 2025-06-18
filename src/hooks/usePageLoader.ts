import { useState, useEffect } from 'react';

export const usePageLoader = (resources: string[], minimumDisplayTime =3000) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const totalResources = resources.length;
    const startTime = Date.now();
    let cancelled = false;

    // Check if resources are already cached
    const checkCache = () => {
      let cachedCount = 0;
      resources.forEach(src => {
        const img = new Image();
        img.src = src;
        if (img.complete) cachedCount++;
      });
      return cachedCount;
    };

    const cachedCount = checkCache();
    if (cachedCount === totalResources) {
      // All resources are cached, we can load much faster
      const fastLoadTime = Math.min(500, minimumDisplayTime);
      setProgress(100);
      setTimeout(() => setIsLoading(false), fastLoadTime);
      return;
    }

    const updateProgress = (newProgress: number) => {
      if (cancelled) return;
      setProgress(prev => Math.min(100, Math.max(prev, newProgress)));
    };

    const checkComplete = () => {
      if (cancelled) return;
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const remainingTime = minimumDisplayTime - elapsedTime;

      if (remainingTime > 0) {
        setTimeout(() => {
          updateProgress(100);
          setTimeout(() => setIsLoading(false), 300);
        }, remainingTime);
      } else {
        updateProgress(100);
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    // Start with progress based on cached resources
    updateProgress((cachedCount / totalResources) * 50);

    if (totalResources === 0) {
      setTimeout(() => {
        updateProgress(100);
        setTimeout(() => setIsLoading(false), 300);
      }, minimumDisplayTime);
      return;
    }

    resources.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (cancelled) return;
        loadedCount++;
        const baseProgress = (cachedCount / totalResources) * 50;
        const loadProgress = (loadedCount / totalResources) * 50;
        updateProgress(baseProgress + loadProgress);
        
        if (loadedCount + cachedCount === totalResources) {
          checkComplete();
        }
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [resources, minimumDisplayTime]);

  return { isLoading, progress };
};