import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#FF0000',
        'secondary-red': '#CC0000',
        primary: {
          gray: '#0A0A0A',
          red: '#B91C1C',
          darkRed: '#7F1D1D',
          blood: '#8B0000',
          light: '#F5F5F5',
          glass: 'rgba(255, 255, 255, 0.03)',
        },
        secondary: {
          gray: '#1A1A1A',
          red: '#DC2626',
          darker: '#050505',
        },
        accent: {
          red: '#EF4444',
          glass: 'rgba(185, 28, 28, 0.1)',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-roboto)'],
      },
      backgroundImage: {
        'hero-gradient': "linear-gradient(to right, rgba(10,10,10,1) 0%, rgba(139,0,0,0.9) 100%)",
        'red-gradient': "linear-gradient(45deg, #7F1D1D, #DC2626, #B91C1C)",
        'dark-gradient': "linear-gradient(45deg, rgba(5,5,5,0.97), rgba(26,26,26,0.95))",
        'noise-pattern': "url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')"
      },
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'image-fade': 'imageFade 1s ease-in-out',
        'cd-spin': 'cdSpin 4s linear infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        imageFade: {
          '0%': { opacity: '0', transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        cdSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};

export default config;
