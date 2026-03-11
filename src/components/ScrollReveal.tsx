'use client';

import React, { useRef, useEffect } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  stagger = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const container = containerRef.current;
            if (!container) return;

            if (stagger) {
              container.classList.add('reveal-stagger--visible');
            } else {
              container.classList.add('reveal--visible');
            }

            observer.unobserve(container);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [stagger]);

  const containerClass = stagger
    ? 'reveal-stagger opacity-0 translate-y-[30px] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
    : 'reveal opacity-0 translate-y-[30px] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]';

  return (
    <div
      ref={containerRef}
      className={`${containerClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;