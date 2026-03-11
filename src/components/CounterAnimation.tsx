'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterAnimationProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function CounterAnimation({
  target,
  suffix = '',
  duration = 2000,
}: CounterAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

  const animate = (time: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = time;
    }

    const elapsed = (time - startTimeRef.current) / duration;
    const progress = Math.min(elapsed, 1);
    const easedProgress = easeOutCubic(progress);

    progressRef.current = easedProgress;
    setDisplayValue(Math.floor(target * easedProgress));

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startTimeRef.current = 0;
          requestRef.current = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [target, duration]);

  useEffect(() => {
    if (isVisible) {
      startTimeRef.current = 0;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setDisplayValue(0);
      progressRef.current = 0;
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isVisible, target]);

  return (
    <div
      ref={elementRef}
      className="text-5xl font-bold text-teal"
    >
      {displayValue}{suffix}
    </div>
  );
}