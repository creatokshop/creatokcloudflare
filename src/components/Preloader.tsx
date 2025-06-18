import { useEffect, useState } from 'react';

interface PreloaderProps {
  progress?: number;
}

export const Preloader = ({ progress = 0 }: PreloaderProps) => {
  const [internalProgress, setInternalProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Smooth progress updates
  useEffect(() => {
    if (progress > internalProgress) {
      const increment = Math.max(1, (progress - internalProgress) / 2);
      setInternalProgress(prev => Math.min(progress, prev + increment));
    }
  }, [progress, internalProgress]);

  // Handle completion
  useEffect(() => {
    if (internalProgress >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [internalProgress]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-50 flex flex-col items-center justify-center">
      {/* Dual spinner design */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute w-full h-full">
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-r-4 border-cyan-600 animate-spin"
            style={{ animationDuration: '1.2s' }}
          ></div>
        </div>
        <div className="absolute w-full h-full">
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full border-b-4 border-l-4 border-rose-500 animate-spin"
            style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
          ></div>
        </div>
      </div>
      
      {/* Loading text with gradient */}
      <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400 mt-3 text-sm font-medium">
        {internalProgress < 30
          ? ''
          : internalProgress < 70
          ? ''
          : internalProgress < 90
          ? ''
          : 'Creatok loading...'}
      </p>
    </div>
  );
};