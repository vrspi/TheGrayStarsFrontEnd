'use client';

import { useState, useEffect } from 'react';

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/homepage');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/homepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      alert('Homepage updated successfully!');
    } catch (error) {
      console.error('Error updating homepage:', error);
      alert('Error updating homepage');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Homepage Management</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        {/* Hero Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="heroTitle"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={data.heroSection.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    heroSection: { ...data.heroSection, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700">
                Subtitle
              </label>
              <input
                type="text"
                id="heroSubtitle"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={data.heroSection.subtitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    heroSection: { ...data.heroSection, subtitle: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">About Section</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="aboutTitle" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="aboutTitle"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={data.aboutSection.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    aboutSection: { ...data.aboutSection, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="aboutContent" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="aboutContent"
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={data.aboutSection.content}
                onChange={(e) =>
                  setData({
                    ...data,
                    aboutSection: { ...data.aboutSection, content: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
