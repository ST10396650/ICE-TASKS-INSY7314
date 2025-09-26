import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Register from '../components/Register';

const RegisterPage = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleRegistrationSuccess = (successMessage) => {
    setMessage(successMessage);
    setMessageType('success');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleRegistrationError = (errorMessage) => {
    setMessage(errorMessage);
    setMessageType('error');
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link 
              to="/login" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && (
            <div className={`mb-4 px-4 py-3 rounded ${
              messageType === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message}
            </div>
          )}
          
          <Register 
            onSuccess={handleRegistrationSuccess} 
            onError={handleRegistrationError}
          />
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

export default RegisterPage;