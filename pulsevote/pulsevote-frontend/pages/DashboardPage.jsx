import { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardPage = ({ user }) => {
  const [stats, setStats] = useState({
    totalPolls: 0,
    totalVotes: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setStats(response.data);
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to your Dashboard
        </h1>
        <p className="text-gray-600">
          Hello, {user.email}! Here's your activity summary.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Polls</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalPolls}</p>
          <p className="text-sm text-gray-500 mt-1">Polls you've created</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Votes</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalVotes}</p>
          <p className="text-sm text-gray-500 mt-1">Votes you've cast</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Member Since</h3>
          <p className="text-lg font-bold text-purple-600">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
          </p>
          <p className="text-sm text-gray-500 mt-1">Account created</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        
        {stats.recentActivity && stats.recentActivity.length > 0 ? (
          <div className="space-y-3">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-400 mt-1">
              Start by creating a poll or voting on existing ones!
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4"> Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Create New Poll
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Browse Polls
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;