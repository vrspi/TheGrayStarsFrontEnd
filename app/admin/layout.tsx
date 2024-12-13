'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiImage, FiMusic, FiUsers, FiArrowLeft } from 'react-icons/fi';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

interface MenuItem {
  id: number;
  title: string;
  path: string;
  icon: React.ReactNode;
  description: string;
}

const menuItems: MenuItem[] = [
  { 
    id: 1, 
    title: 'Homepage', 
    path: '/admin/homepage', 
    icon: <FiHome className="w-5 h-5" />,
    description: 'Manage your website\'s main content'
  },
  { 
    id: 2, 
    title: 'Gallery', 
    path: '/admin/gallery', 
    icon: <FiImage className="w-5 h-5" />,
    description: 'Manage photo gallery and media'
  },
  { 
    id: 3, 
    title: 'Music', 
    path: '/admin/music', 
    icon: <FiMusic className="w-5 h-5" />,
    description: 'Manage tracks and albums'
  },
  { 
    id: 4, 
    title: 'Band Members', 
    path: '/admin/band-members', 
    icon: <FiUsers className="w-5 h-5" />,
    description: 'Manage band member profiles'
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const pathname = usePathname();

  const menuItemVariants = {
    initial: { 
      opacity: 0, 
      x: -20 
    },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }),
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <LayoutGroup>
      <div className="min-h-screen bg-[#0A0A0A] flex">
        {/* Fixed Side Menu */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="fixed top-0 left-0 h-full w-[300px] bg-[#111111] border-r border-gray-800/50 z-40 overflow-hidden shadow-2xl shadow-black/20"
        >
          {/* Logo Section */}
          <div className="h-16 flex items-center px-6 border-b border-gray-800/50">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-red to-secondary-red flex items-center justify-center"
              >
                <span className="text-white font-bold">GS</span>
              </motion.div>
              <h1 className="text-white font-semibold text-lg">Admin Panel</h1>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-6 px-4">
            <AnimatePresence mode="wait">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <Link key={item.id} href={item.path}>
                    <motion.div
                      variants={menuItemVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                      whileTap="tap"
                      custom={index}
                      onHoverStart={() => setHoveredItem(item.id)}
                      onHoverEnd={() => setHoveredItem(null)}
                      className={`relative flex items-center px-4 py-3 rounded-xl mb-2 cursor-pointer group
                        ${isActive 
                          ? 'bg-gradient-to-r from-primary-red/20 to-transparent text-white' 
                          : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-6 bg-primary-red rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Icon */}
                      <motion.span 
                        className="relative z-10"
                        variants={iconVariants}
                      >
                        {item.icon}
                      </motion.span>

                      {/* Title and Description */}
                      <div className="ml-4 overflow-hidden">
                        <div className="font-medium">{item.title}</div>
                        {hoveredItem === item.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xs text-gray-500"
                          >
                            {item.description}
                          </motion.div>
                        )}
                      </div>

                      {/* Hover Effect */}
                      {hoveredItem === item.id && (
                        <motion.div
                          layoutId="hoverBackground"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-red/5 to-transparent -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Back to Website Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl 
                  hover:from-gray-800/70 hover:to-gray-900/70 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-red to-secondary-red 
                      flex items-center justify-center"
                  >
                    <FiArrowLeft className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-medium text-white">Back to Website</div>
                    <div className="text-xs text-gray-400">View your public site</div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.main
          layout
          className="flex-1 ml-[300px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </motion.main>
      </div>
    </LayoutGroup>
  );
}
