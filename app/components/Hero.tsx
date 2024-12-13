'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useSpring, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import InteractiveBackground from './InteractiveBackground';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export default function Hero({ title, subtitle, backgroundImage }: HeroProps) {
  return (
    <>
      <InteractiveBackground imagePath={backgroundImage} />
      <div className="relative w-full h-full flex items-center justify-center z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Text Content */}
            <motion.div 
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.span 
                  className="text-white inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {title}
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button 
                  className="bg-primary-red text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Listen Now
                </motion.button>
                <motion.button 
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tour Dates
                </motion.button>
              </motion.div>
            </motion.div>

            {/* 3D CD Effect */}
            <motion.div 
              className="flex-1 relative w-full max-w-lg aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-full h-full">
                {/* CD Container */}
                <div className="absolute inset-0">
                  {/* CD Outer Ring */}
                  <div className="absolute inset-0 rounded-full border-8 border-gray-800 shadow-2xl" />
                  
                  {/* CD Surface */}
                  <motion.div 
                    className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* CD Label */}
                    <div className="absolute inset-8 rounded-full overflow-hidden">
                      <Image
                        src={backgroundImage}
                        alt="Hero"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                      
                      {/* CD Center Hole */}
                      <div className="absolute inset-[45%] rounded-full bg-gray-900 border-4 border-gray-800" />
                      
                      {/* Radial Lines */}
                      <div className="absolute inset-0 bg-gradient-conic from-transparent via-white/5 to-transparent animate-spin-slow" />
                    </div>

                    {/* CD Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                    
                    {/* Rainbow Effect */}
                    <div className="absolute inset-0 bg-gradient-conic from-blue-500/10 via-purple-500/10 via-red-500/10 via-yellow-500/10 to-blue-500/10 animate-spin-very-slow" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
