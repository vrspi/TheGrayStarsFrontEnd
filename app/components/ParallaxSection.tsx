import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgColor?: string;
  zIndex?: number;
}

export default function ParallaxSection({ 
  children, 
  bgColor = 'bg-primary-gray',
  zIndex = 1,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.8]);

  return (
    <div ref={ref} className="relative h-screen">
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity,
          scale,
          zIndex
        }}
        className={`${bgColor} w-full h-screen flex items-center justify-center`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 