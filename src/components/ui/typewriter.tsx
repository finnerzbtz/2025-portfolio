'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TypeWriterProps {
  text: string;
  delay?: number;
  speed?: number;
  startDelay?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  delay = 100,
  speed = 50,
  startDelay = 0,
  className = '',
  onComplete,
  cursor = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const indexRef = useRef(0);
  const isCompleteRef = useRef(false);
  const hasStartedRef = useRef(false);

  // Start animation after delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      hasStartedRef.current = true;
      setShowCursor(true);
      
      // Start typing
      const typeInterval = setInterval(() => {
        if (indexRef.current < text.length) {
          indexRef.current++;
          setDisplayText(text.slice(0, indexRef.current));
        } else {
          // Completed
          clearInterval(typeInterval);
          isCompleteRef.current = true;
          
          // Call onComplete after a brief delay
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 200);
          
          // Hide cursor after completion
          setTimeout(() => {
            setShowCursor(false);
          }, 1500);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (!hasStartedRef.current || isCompleteRef.current) return;

    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <span className={`${className} notranslate`} translate="no">
      {displayText}
      {cursor && hasStartedRef.current && showCursor && (
        <span className="inline-block w-0.5 h-[1em] bg-current ml-1">
          |
        </span>
      )}
    </span>
  );
};

export default TypeWriter; 