'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface InteractiveBackgroundProps {
  imagePath: string;
  blurAmount?: number;
}

export default function InteractiveBackground({ 
  imagePath, 
  blurAmount = 10 
}: InteractiveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="fixed inset-0 w-full h-full z-0"
    >
      {/* Blurred Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imagePath}
          alt="Background"
          fill
          priority
          className={`object-cover transition-all duration-500 ${isHovering ? 'blur-xl' : 'blur-none'}`}
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Clear Circle Following Mouse */}
      {isHovering && (
        <div
          className="absolute pointer-events-none transition-transform duration-200 ease-out"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: '300px',
            height: '300px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <Image
              src={imagePath}
              alt="Clear Area"
              fill
              className="object-cover"
              sizes="300px"
              quality={90}
              style={{
                transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
              }}
            />
            {/* Feathered edge mask */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,1) 70%)',
              }}
            />
          </div>
        </div>
      )}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
} 