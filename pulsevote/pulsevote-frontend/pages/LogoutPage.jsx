import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const LogoutPage = ({ logout }) => {
  useEffect(() => {
    // Perform logout
    logout();
  }, [logout]);

  // Redirect to home page after logout
  return <Navigate to="/" replace />;
};

export default LogoutPage;