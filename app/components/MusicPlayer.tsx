'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { BsShuffle, BsRepeat } from 'react-icons/bs';
import YouTube from 'react-youtube';
import { API_ENDPOINTS } from '@/config/api';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  release_date: string;
  duration: string;
  audio_url: string;
  cover_image_url: string;
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [player, setPlayer] = useState<any>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showTracksModal, setShowTracksModal] = useState(false);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await fetch(API_ENDPOINTS.MUSIC);
        if (!response.ok) {
          throw new Error('Failed to fetch tracks');
        }
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        setError('Failed to load tracks');
      } finally {
        setLoading(false);
      }
    }
    fetchTracks();
  }, []);

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  const togglePlay = () => {
    if (!player) return;
    
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    if (shuffle) {
      const nextTrack = Math.floor(Math.random() * tracks.length);
      setCurrentTrack(nextTrack);
    } else {
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    }
  };

  const handlePrevTrack = () => {
    if (shuffle) {
      const prevTrack = Math.floor(Math.random() * tracks.length);
      setCurrentTrack(prevTrack);
    } else {
      setCurrentTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
        player.setVolume(volume);
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (player) {
      player.seekTo(newTime);
    }
  };

  const handleTrackClick = (index: number) => {
    setCurrentTrack(index);
    setShowTracksModal(false);
  };

  useEffect(() => {
    if (player) {
      const timer = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [player]);

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1 as 1 | 0,
      controls: 0 as 1 | 0,
    },
  };

  if (loading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  if (error || tracks.length === 0) {
    return null;
  }

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/);
    return match?.[1] || '';
  };

  const currentTrackData = tracks[currentTrack];
  const videoId = getVideoId(currentTrackData?.audio_url || '');

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Background with blur and gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/90 backdrop-blur-xl" />
        
        {/* Red accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-red to-transparent opacity-50" />
        
        {/* Content */}
        <div className="relative px-4 py-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Track Info with enhanced styling */}
              <div className="flex items-center space-x-4 w-full md:w-auto md:min-w-[240px] md:max-w-[300px] shrink-0">
                <div className="relative group cursor-pointer shrink-0">
                  {/* Image container with red glow effect */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-red to-transparent opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300" />
                    <Image
                      src={currentTrackData?.cover_image_url || '/placeholder-album.jpg'}
                      alt={currentTrackData?.title || 'Album Cover'}
                      width={48}
                      height={48}
                      className="rounded-lg relative z-10"
                    />
                  </div>
                </div>
                <div 
                  className="min-w-0 cursor-pointer group" 
                  onClick={() => setShowTracksModal(true)}
                >
                  <h3 className="text-sm font-semibold truncate text-white group-hover:text-primary-red transition-colors duration-300">
                    {currentTrackData?.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate group-hover:text-primary-red/80 transition-colors duration-300">
                    {currentTrackData?.artist}
                  </p>
                </div>
              </div>

              {/* Controls with enhanced styling */}
              <div className="flex flex-col items-center w-full max-w-2xl gap-2">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => setShuffle(!shuffle)}
                    className={`p-2 rounded-full hover:bg-primary-red/10 transition-all duration-300 ${
                      shuffle ? 'text-primary-red' : 'text-gray-400'
                    }`}
                  >
                    <BsShuffle size={16} />
                  </button>
                  <button
                    onClick={handlePrevTrack}
                    className="p-2 rounded-full hover:bg-primary-red/10 transition-all duration-300 text-gray-300 hover:text-white"
                  >
                    <FaStepBackward size={18} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="p-4 bg-gradient-to-br from-primary-red to-secondary-red rounded-full hover:from-primary-red/90 hover:to-secondary-red/90 transition-all duration-300 shadow-lg hover:shadow-primary-red/20 group"
                  >
                    {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="translate-x-0.5" />}
                  </button>
                  <button
                    onClick={handleNextTrack}
                    className="p-2 rounded-full hover:bg-primary-red/10 transition-all duration-300 text-gray-300 hover:text-white"
                  >
                    <FaStepForward size={18} />
                  </button>
                  <button
                    onClick={() => setRepeat(!repeat)}
                    className={`p-2 rounded-full hover:bg-primary-red/10 transition-all duration-300 ${
                      repeat ? 'text-primary-red' : 'text-gray-400'
                    }`}
                  >
                    <BsRepeat size={16} />
                  </button>
                </div>

                {/* Progress Bar with enhanced styling */}
                <div className="flex items-center space-x-2 w-full">
                  <span className="text-xs text-gray-400 w-10 text-right">
                    {formatTime(currentTime)}
                  </span>
                  <div className="relative w-full h-1 group">
                    <input
                      type="range"
                      min={0}
                      max={duration}
                      value={currentTime}
                      onChange={handleTimeChange}
                      className="absolute w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer range-sm 
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-red 
                        [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300
                        [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:hover:shadow-lg
                        [&::-webkit-slider-thumb]:hover:shadow-primary-red/30"
                    />
                    <div 
                      className="absolute h-1 bg-gradient-to-r from-primary-red to-secondary-red rounded-full pointer-events-none"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-10">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Volume Control with enhanced styling */}
              <div className="flex items-center space-x-2 w-full md:w-auto md:min-w-[120px] shrink-0">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-primary-red/10 transition-all duration-300 text-gray-300 hover:text-white"
                >
                  {isMuted || volume === 0 ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                </button>
                <div className="relative w-full md:w-20 h-1 group">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="absolute w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer range-sm
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-red 
                      [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-300
                      [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:hover:shadow-lg
                      [&::-webkit-slider-thumb]:hover:shadow-primary-red/30"
                  />
                  <div 
                    className="absolute h-1 bg-gradient-to-r from-primary-red to-secondary-red rounded-full pointer-events-none"
                    style={{ width: `${volume}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks Modal with enhanced styling */}
      {showTracksModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl animate-fade-up border border-primary-red/20">
            <div className="p-4 border-b border-gray-800/50 bg-gradient-to-r from-primary-red/5 to-transparent">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Tracks</h2>
                <button
                  onClick={() => setShowTracksModal(false)}
                  className="p-2 hover:bg-primary-red/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => handleTrackClick(index)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                    currentTrack === index
                      ? 'bg-primary-red/20 text-white'
                      : 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
                  } transition-all duration-300 group`}
                >
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-red to-transparent opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300 rounded-lg" />
                    <Image
                      src={track.cover_image_url || '/placeholder-album.jpg'}
                      alt={track.title}
                      width={40}
                      height={40}
                      className="rounded relative z-10"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{track.title}</h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">{track.artist}</p>
                  </div>
                  {currentTrack === index && isPlaying && (
                    <div className="ml-auto">
                      <div className="w-4 h-4 border-2 border-primary-red border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hidden YouTube Player */}
      <div className="hidden">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={(event) => {
            if (event.data === 0) {
              // Video ended
              if (repeat) {
                event.target.playVideo();
              } else {
                handleNextTrack();
              }
            }
          }}
        />
      </div>
    </>
  );
}
