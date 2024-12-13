import { Children } from 'react';

interface ParallaxContainerProps {
  children: React.ReactNode;
}

export default function ParallaxContainer({ children }: ParallaxContainerProps) {
  return (
    <div className="relative">
      {/* This creates space for all sections while they're fixed */}
      <div className="relative" style={{ height: `${Children.count(children) * 100}vh` }}>
        {children}
      </div>
    </div>
  );
} 