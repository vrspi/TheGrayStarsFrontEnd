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
    <section className="relative min-h-screen bg-black text-white py-20">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">{title}</h2>
        <div className="prose prose-lg prose-invert max-w-none">
          <p>{content}</p>
        </div>
      </div>
    </section>
  );
}
