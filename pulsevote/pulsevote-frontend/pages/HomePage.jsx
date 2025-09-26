import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to PulseVote
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Your voice matters. Join our platform to participate in polls, share opinions, 
          and make your voice heard in the democratic process.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Create Polls</h3>
            <p className="text-gray-600">
              Design and share custom polls to gather opinions on topics that matter to you.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Vote & Engage</h3>
            <p className="text-gray-600">
              Participate in community polls and engage with diverse perspectives.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Track Results</h3>
            <p className="text-gray-600">
              Monitor real-time results and analyze voting trends and patterns.
            </p>
          </div>
        </div>
        
        <div className="space-x-4">
          <Link 
            to="/register" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Get Started
          </Link>
          <Link 
            to="/login" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;