'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface AboutProps {
  title: string;
  content: string;
  image: string;
}

export default function About({ title, content, image }: AboutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <motion.div 
            className="flex-1 relative w-full aspect-square rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={image}
              alt="About The Gray Stars"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {title}
            </h2>
            <div className="prose prose-lg prose-invert">
              <p className="text-gray-300">
                {content}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
