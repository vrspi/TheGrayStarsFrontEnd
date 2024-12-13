'use client';

import Link from 'next/link';

const Footer = () => {
  const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'YouTube', href: '#' },
  ];

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Band', href: '/band' },
    { name: 'Music', href: '/music' },
    { name: 'Tours', href: '/tours' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-primary-gray/90 backdrop-blur-md"></div>
      <div className="absolute inset-0 bg-noise-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="backdrop-blur-sm bg-primary-glass p-6 rounded-lg">
            <h2 className="text-2xl font-bold">
              <span className="text-white">
                TheGray<span className="text-primary-red">Stars</span>
              </span>
            </h2>
            <p className="mt-4 text-gray-300">
              Experience the fusion of rock and innovation with TheGrayStars.
            </p>
          </div>

          {/* Quick Links */}
          <div className="backdrop-blur-sm bg-primary-glass p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-primary-red">Quick Links</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-primary-red transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="backdrop-blur-sm bg-primary-glass p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-primary-red">Follow Us</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-red transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} TheGrayStars. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 