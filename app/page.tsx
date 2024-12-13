'use client';

import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Tour from './components/Tour';
import BandMembers from './components/BandMembers';
import MusicPlayer from './components/MusicPlayer';
import ParallaxContainer from './components/ParallaxContainer';
import ParallaxSection from './components/ParallaxSection';

interface HomepageData {
  heroSection: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  aboutSection: {
    title: string;
    content: string;
    image: string;
  };
  featuredProducts: Array<{ id: string }>;
}

export default function Home() {
  const [data, setData] = useState<HomepageData>({
    heroSection: {
      title: 'The Gray Stars',
      subtitle: 'Experience the fusion of classic rock and modern edge',
      backgroundImage: '/images/background.jpg',
    },
    aboutSection: {
      title: 'About Us',
      content: 'Welcome to TheGrayStars',
      image: '/images/about-background.jpg',
    },
    featuredProducts: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/api/homepage');
        const homepageData = await response.json();
        setData(homepageData);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="relative bg-black">
      <ParallaxContainer>
        {/* Hero Section */}
        <ParallaxSection zIndex={50}>
          <Hero 
            title={data.heroSection.title}
            subtitle={data.heroSection.subtitle}
            backgroundImage={data.heroSection.backgroundImage}
          />
        </ParallaxSection>

        {/* About Section */}
        <ParallaxSection 
          bgColor="bg-secondary-gray" 
          zIndex={40}
        >
          <About 
            title={data.aboutSection.title}
            content={data.aboutSection.content}
            image={data.aboutSection.image}
          />
        </ParallaxSection>

        {/* Band Members Section */}
        <ParallaxSection 
          bgColor="bg-primary-blood" 
          zIndex={30}
        >
          <BandMembers />
        </ParallaxSection>

        {/* Music Player Section */}
        <ParallaxSection 
          bgColor="bg-secondary-darker" 
          zIndex={20}
        >
          <MusicPlayer />
        </ParallaxSection>

        {/* Tour Section */}
        <ParallaxSection 
          bgColor="bg-primary-darkRed" 
          zIndex={10}
        >
          <Tour />
        </ParallaxSection>
      </ParallaxContainer>
    </main>
  );
}
