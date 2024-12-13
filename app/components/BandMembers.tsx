'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { API_ENDPOINTS } from '../config/api';

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

interface BandMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  bio: string;
  social_links: SocialLinks;
  display_order: number;
}

interface BandMembersProps {
  members?: BandMember[];
}

export default function BandMembers({ members: initialMembers }: BandMembersProps) {
  const [members, setMembers] = useState<BandMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch(API_ENDPOINTS.BAND_MEMBERS);
        if (!response.ok) {
          throw new Error('Failed to fetch band members');
        }
        const data = await response.json();
        console.log('Fetched members:', data);
        const sortedMembers = data.sort((a: BandMember, b: BandMember) => a.display_order - b.display_order);
        setMembers(sortedMembers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching band members:', error);
        setError('Failed to load band members');
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  // Create infinite scroll effect by duplicating members
  const duplicatedMembers = [...members, ...members, ...members];

  // Smooth auto-scroll effect
  useEffect(() => {
    if (!containerRef.current || members.length === 0) return;
    
    const scrollContainer = containerRef.current;
    let animationFrameId: number;
    let startTime: number;
    const totalDuration = 30000; // 30 seconds for one complete loop

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      if (!scrollContainer) return;

      const elapsed = timestamp - startTime;
      const progress = (elapsed % totalDuration) / totalDuration;
      
      const totalWidth = scrollContainer.scrollWidth / 3;
      const newScrollPosition = progress * totalWidth;
      
      if (scrollContainer.scrollLeft >= totalWidth) {
        // Reset to first set of items when we reach the second set
        scrollContainer.scrollLeft = newScrollPosition;
        startTime = timestamp;
      } else {
        scrollContainer.scrollLeft = newScrollPosition;
      }

      if (!isHovered) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [members, isHovered]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-red border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <motion.h2 
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-white">Meet The </span>
        <span className="text-primary-red">Band</span>
      </motion.h2>

      <div className="relative w-[95vw] overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-primary-blood to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-l from-primary-blood to-transparent z-10" />

        {/* Scrollable container */}
        <div 
          ref={containerRef}
          className="overflow-x-scroll hide-scrollbar px-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex space-x-6 sm:space-x-8 md:space-x-10 py-4 min-w-max">
            {duplicatedMembers.map((member, index) => (
              <motion.div
                key={`${member.id}-${index}`}
                className="flex-none w-44 sm:w-52 md:w-60 lg:w-72"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.1
                }}
              >
                {/* CD Container */}
                <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-2xl transform-gpu group">
                  {/* CD Image */}
                  <div className="absolute inset-0 rounded-full overflow-hidden bg-black">
                    <Image
                      src={member.image_url}
                      alt={member.name}
                      fill
                      className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:blur-sm"
                      sizes="(max-width: 640px) 11rem, (max-width: 768px) 13rem, (max-width: 1024px) 15rem, 18rem"
                    />
                    {/* CD Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                    <div className="absolute inset-0 shadow-inner" />
                    
                    {/* CD Center Hole */}
                    <div className="absolute inset-[45%] rounded-full bg-black border-4 border-white/10" />
                    
                    {/* CD Grooves */}
                    <div className="absolute inset-0 bg-gradient-conic from-transparent via-white/5 to-transparent animate-spin-slow opacity-50" />
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center text-center p-3 sm:p-4 backdrop-blur-sm">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-primary-red font-medium mb-1 sm:mb-2 text-sm sm:text-base">{member.role}</p>
                    <p className="text-gray-300 text-xs sm:text-sm mb-2 line-clamp-2">{member.bio}</p>
                    
                    {/* Social Links */}
                    {member.social_links && (
                      <div className="flex gap-2 sm:gap-3">
                        {member.social_links.instagram && (
                          <motion.a 
                            href={member.social_links.instagram}
                            className="text-white hover:text-primary-red transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                          >
                            <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.a>
                        )}
                        {member.social_links.twitter && (
                          <motion.a 
                            href={member.social_links.twitter}
                            className="text-white hover:text-primary-red transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                          >
                            <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.a>
                        )}
                        {member.social_links.facebook && (
                          <motion.a 
                            href={member.social_links.facebook}
                            className="text-white hover:text-primary-red transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                          >
                            <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Name and Role Below CD */}
                <motion.div 
                  className="text-center mt-3 sm:mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-primary-red text-xs sm:text-sm">{member.role}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
