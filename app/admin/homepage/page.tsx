'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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

export default function HomepageManagement() {
  const [data, setData] = useState<HomepageData>({
    heroSection: {
      title: '',
      subtitle: '',
      backgroundImage: '',
    },
    aboutSection: {
      title: '',
      content: '',
      image: '',
    },
    featuredProducts: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3001/api/homepage');
      if (!response.ok) {
        throw new Error('Failed to fetch homepage data');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      setError('Failed to load homepage data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3001/api/homepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update homepage');
      }
      
      alert('Homepage updated successfully!');
    } catch (error) {
      console.error('Error updating homepage:', error);
      setError('Failed to update homepage. Please try again.');
    } finally {
      setSaving(false);
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-black tracking-tight">Homepage Management</h1>
          <button
            onClick={() => fetchData()}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? 'Refreshing...' : 'Refresh'}
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="h-8 w-1 bg-black rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-black">Hero Section</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label htmlFor="heroTitle" className="block text-sm font-medium text-black mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="heroTitle"
                  className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                  value={data.heroSection.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      heroSection: { ...data.heroSection, title: e.target.value },
                    })
                  }
                  placeholder="Enter hero title"
                />
              </div>
              <div>
                <label htmlFor="heroSubtitle" className="block text-sm font-medium text-black mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  id="heroSubtitle"
                  className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                  value={data.heroSection.subtitle}
                  onChange={(e) =>
                    setData({
                      ...data,
                      heroSection: { ...data.heroSection, subtitle: e.target.value },
                    })
                  }
                  placeholder="Enter hero subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Background Image</label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                      value={data.heroSection.backgroundImage}
                      placeholder="Enter image URL"
                      onChange={(e) =>
                        setData({
                          ...data,
                          heroSection: { ...data.heroSection, backgroundImage: e.target.value },
                        })
                      }
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-3 text-sm font-medium text-black bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload
                    </button>
                  </div>
                  {data.heroSection.backgroundImage && (
                    <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={data.heroSection.backgroundImage}
                        alt="Hero Background Preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="h-8 w-1 bg-black rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-black">About Section</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label htmlFor="aboutTitle" className="block text-sm font-medium text-black mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="aboutTitle"
                  className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                  value={data.aboutSection.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      aboutSection: { ...data.aboutSection, title: e.target.value },
                    })
                  }
                  placeholder="Enter about section title"
                />
              </div>
              <div>
                <label htmlFor="aboutContent" className="block text-sm font-medium text-black mb-2">
                  Content
                </label>
                <textarea
                  id="aboutContent"
                  rows={4}
                  className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                  value={data.aboutSection.content}
                  onChange={(e) =>
                    setData({
                      ...data,
                      aboutSection: { ...data.aboutSection, content: e.target.value },
                    })
                  }
                  placeholder="Enter about section content"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Image</label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 text-black bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                      value={data.aboutSection.image}
                      placeholder="Enter image URL"
                      onChange={(e) =>
                        setData({
                          ...data,
                          aboutSection: { ...data.aboutSection, image: e.target.value },
                        })
                      }
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-3 text-sm font-medium text-black bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload
                    </button>
                  </div>
                  {data.aboutSection.image && (
                    <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={data.aboutSection.image}
                        alt="About Section Preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => fetchData()}
              disabled={loading}
              className="px-6 py-3 text-sm font-medium text-black bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-50"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 text-sm font-medium text-white bg-black border border-black rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-50"
            >
              {saving ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
