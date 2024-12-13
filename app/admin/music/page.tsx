'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { API_ENDPOINTS } from '@/config/api';

interface MusicTrack {
  id: number;
  title: string;
  artist: string;
  album: string;
  release_date: string;
  duration: string;
  audio_url: string;
  cover_image_url: string;
}

export default function MusicManagement() {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<MusicTrack | null>(null);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_ENDPOINTS.MUSIC);
      if (!response.ok) {
        throw new Error('Failed to fetch music tracks');
      }
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error('Error fetching music tracks:', error);
      setError('Failed to load music tracks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrack) return;

    try {
      const response = await fetch(`${API_ENDPOINTS.MUSIC}${selectedTrack.id ? `/${selectedTrack.id}` : ''}`, {
        method: selectedTrack.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedTrack),
      });

      if (!response.ok) {
        throw new Error('Failed to save music track');
      }

      await fetchTracks();
      setSelectedTrack(null);
    } catch (error) {
      console.error('Error saving music track:', error);
      setError('Failed to save music track. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this track?')) return;

    try {
      const response = await fetch(`${API_ENDPOINTS.MUSIC}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete music track');
      }

      await fetchTracks();
    } catch (error) {
      console.error('Error deleting music track:', error);
      setError('Failed to delete music track. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-black tracking-tight">Music Management</h1>
          <button
            onClick={() => setSelectedTrack({
              id: 0,
              title: '',
              artist: '',
              album: '',
              release_date: '',
              duration: '',
              audio_url: '',
              cover_image_url: ''
            })}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
          >
            Add New Track
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-400 text-red-800 rounded-r-lg">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Music Tracks List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Track</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Album</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tracks.map((track) => (
                <tr key={track.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          src={track.cover_image_url || '/placeholder-album.jpg'}
                          alt={track.title}
                          width={40}
                          height={40}
                          className="rounded-sm object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{track.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{track.artist}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{track.album}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{track.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(track.release_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedTrack(track)}
                      className="text-black hover:text-gray-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(track.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit/Add Modal */}
        {selectedTrack && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedTrack.id ? 'Edit Track' : 'Add New Track'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={selectedTrack.title}
                      onChange={(e) => setSelectedTrack({ ...selectedTrack, title: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
                      Artist
                    </label>
                    <input
                      type="text"
                      id="artist"
                      value={selectedTrack.artist}
                      onChange={(e) => setSelectedTrack({ ...selectedTrack, artist: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="album" className="block text-sm font-medium text-gray-700">
                      Album
                    </label>
                    <input
                      type="text"
                      id="album"
                      value={selectedTrack.album}
                      onChange={(e) => setSelectedTrack({ ...selectedTrack, album: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      value={selectedTrack.duration}
                      onChange={(e) => setSelectedTrack({ ...selectedTrack, duration: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      placeholder="mm:ss"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="release_date" className="block text-sm font-medium text-gray-700">
                    Release Date
                  </label>
                  <input
                    type="date"
                    id="release_date"
                    value={selectedTrack.release_date}
                    onChange={(e) => setSelectedTrack({ ...selectedTrack, release_date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>
                <div>
                  <label htmlFor="audio_url" className="block text-sm font-medium text-gray-700">
                    Audio File
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="text"
                      id="audio_url"
                      value={selectedTrack.audio_url}
                      onChange={(e) => setSelectedTrack({ ...selectedTrack, audio_url: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                      required
                    />
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="cover_image_url" className="block text-sm font-medium text-gray-700">
                    Cover Image
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="text"
                      id="cover_image_url"
                      value={selectedTrack.cover_image_url}
                      onChange={(e) => setSelectedTrack({ ...selectedTrack, cover_image_url: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedTrack(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}