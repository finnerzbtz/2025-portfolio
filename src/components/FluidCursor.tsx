'use client';
import { useEffect, useRef } from 'react';

import fluidCursor from '@/hooks/use-FluidCursor';

const FluidCursor = () => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      try {
    fluidCursor();
        hasInitialized.current = true;
      } catch (error) {
        // Silently handle FluidCursor initialization errors
      }
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 z-0 pointer-events-none">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
};

export default FluidCursor;
