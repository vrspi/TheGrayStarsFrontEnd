'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
}

interface BandMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  social_links: SocialLinks;
  display_order: number;
}

export default function BandMembersManagement() {
  const [members, setMembers] = useState<BandMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMember, setSelectedMember] = useState<BandMember | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3001/api/band-members');
      if (!response.ok) {
        throw new Error('Failed to fetch band members');
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching band members:', error);
      setError('Failed to load band members. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    try {
      const response = await fetch(`http://localhost:3001/api/band-members${selectedMember.id ? `/${selectedMember.id}` : ''}`, {
        method: selectedMember.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedMember),
      });

      if (!response.ok) {
        throw new Error('Failed to save band member');
      }

      await fetchMembers();
      setSelectedMember(null);
    } catch (error) {
      console.error('Error saving band member:', error);
      setError('Failed to save band member. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this member?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/band-members/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete band member');
      }

      await fetchMembers();
    } catch (error) {
      console.error('Error deleting band member:', error);
      setError('Failed to delete band member. Please try again.');
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
          <h1 className="text-4xl font-bold text-black tracking-tight">Band Members Management</h1>
          <button
            onClick={() => setSelectedMember({
              id: 0,
              name: '',
              role: '',
              bio: '',
              image_url: '',
              social_links: {
                facebook: '',
                twitter: '',
                instagram: ''
              },
              display_order: members.length + 1
            })}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all"
          >
            Add New Member
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

        {/* Band Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={member.image_url || '/placeholder-member.jpg'}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black">{member.name}</h3>
                <p className="text-sm text-black mt-1">{member.role}</p>
                <p className="text-sm text-black mt-4 line-clamp-3">{member.bio}</p>
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex space-x-2">
                    {member.social_links.facebook && (
                      <a href={member.social_links.facebook} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                        <span className="sr-only">Facebook</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {member.social_links.twitter && (
                      <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    )}
                    {member.social_links.instagram && (
                      <a href={member.social_links.instagram} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700">
                        <span className="sr-only">Instagram</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="text-black hover:text-gray-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit/Add Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold text-black mb-6">
                {selectedMember.id ? 'Edit Band Member' : 'Add New Band Member'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={selectedMember.name}
                      onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-black">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      value={selectedMember.role}
                      onChange={(e) => setSelectedMember({ ...selectedMember, role: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-black"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-black">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={selectedMember.bio}
                    onChange={(e) => setSelectedMember({ ...selectedMember, bio: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-black"
                  />
                </div>
                <div>
                  <label htmlFor="image_url" className="block text-sm font-medium text-black">
                    Profile Image
                  </label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="text"
                      id="image_url"
                      value={selectedMember.image_url}
                      onChange={(e) => setSelectedMember({ ...selectedMember, image_url: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-black"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="facebook" className="block text-sm font-medium text-black">
                      Facebook URL
                    </label>
                    <input
                      type="text"
                      id="facebook"
                      value={selectedMember.social_links.facebook || ''}
                      onChange={(e) => setSelectedMember({
                        ...selectedMember,
                        social_links: { ...selectedMember.social_links, facebook: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-black">
                      Twitter URL
                    </label>
                    <input
                      type="text"
                      id="twitter"
                      value={selectedMember.social_links.twitter || ''}
                      onChange={(e) => setSelectedMember({
                        ...selectedMember,
                        social_links: { ...selectedMember.social_links, twitter: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-black"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-black">
                      Instagram URL
                    </label>
                    <input
                      type="text"
                      id="instagram"
                      value={selectedMember.social_links.instagram || ''}
                      onChange={(e) => setSelectedMember({
                        ...selectedMember,
                        social_links: { ...selectedMember.social_links, instagram: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="display_order" className="block text-sm font-medium text-black">
                      Display Order
                    </label>
                    <input
                      type="number"
                      id="display_order"
                      value={selectedMember.display_order}
                      onChange={(e) => setSelectedMember({
                        ...selectedMember,
                        display_order: parseInt(e.target.value)
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-black"
                      min="1"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
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