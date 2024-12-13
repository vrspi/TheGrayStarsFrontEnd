'use client';

import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Tour from './components/Tour';
import BandMembers from './components/BandMembers';
import MusicPlayer from './components/MusicPlayer';
import ParallaxContainer from './components/ParallaxContainer';
import ParallaxSection from './components/ParallaxSection';
import { API_ENDPOINTS } from './config/api';

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
  featuredTracks: Array<{ id: string }>;
  latestNews: Array<{ id: string }>;
  upcomingShows: Array<{ id: string }>;
  featuredProducts: Array<{ id: string }>;
}

export default function Home() {
  const [data, setData] = useState<HomepageData>({
    heroSection: {
      title: 'Welcome to The Gray Stars',
      subtitle: 'Experience the fusion of classic and modern rock',
      backgroundImage: '/images/hero-background.jpg'
    },
    aboutSection: {
      title: 'About Us',
      content: 'The Gray Stars is a dynamic rock band that emerged from the vibrant music scene of Montreal.',
      image: '/images/about-background.jpg'
    },
    featuredTracks: [],
    latestNews: [],
    upcomingShows: [],
    featuredProducts: []
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHomepageData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.HOMEPAGE);
      if (!response.ok) {
        throw new Error(`Failed to fetch homepage data: ${response.statusText}`);
      }
      const homepageData = await response.json();
      // Only update state if we have valid data
      if (homepageData && typeof homepageData === 'object') {
        setData(prevData => ({
          ...prevData,
          ...homepageData
        }));
      }
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load homepage data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomepageData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Oops!</h1>
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

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
