'use client';

import { FiFileText, FiImage, FiUsers } from 'react-icons/fi';

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="mt-1 text-gray-600">Welcome to your content management system.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-3xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <FiFileText className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm font-medium">+12%</span>
            <span className="text-gray-600 text-sm ml-2">from last month</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Media Items</p>
              <p className="text-3xl font-bold text-gray-900">156</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <FiImage className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm font-medium">+8%</span>
            <span className="text-gray-600 text-sm ml-2">from last month</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FiUsers className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm font-medium">+4%</span>
            <span className="text-gray-600 text-sm ml-2">from last month</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Comments</p>
              <p className="text-3xl font-bold text-gray-900">89</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FiFileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-red-500 text-sm font-medium">-2%</span>
            <span className="text-gray-600 text-sm ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-indigo-100 rounded-lg mr-4">
              <FiFileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">New post created</p>
              <p className="text-sm text-gray-500">John Doe created "Getting Started with Next.js"</p>
            </div>
            <span className="ml-auto text-sm text-gray-500">2m ago</span>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg mr-4">
              <FiUsers className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">New user registered</p>
              <p className="text-sm text-gray-500">Jane Smith joined the platform</p>
            </div>
            <span className="ml-auto text-sm text-gray-500">1h ago</span>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-pink-100 rounded-lg mr-4">
              <FiImage className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Media uploaded</p>
              <p className="text-sm text-gray-500">5 new images added to gallery</p>
            </div>
            <span className="ml-auto text-sm text-gray-500">3h ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
