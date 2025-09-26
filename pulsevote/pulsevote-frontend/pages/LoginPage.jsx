import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = ({ login }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSuccess = (successMessage) => {
    setMessage(successMessage);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link 
              to="/register" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              register for a new account
            </Link>
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {message}
            </div>
          )}
          
          <Login login={login} onSuccess={handleLoginSuccess} />
        </div>
        
        <div className="text-center">
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;