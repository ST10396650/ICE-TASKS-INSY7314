import { Link } from 'react-router-dom';

const Layout = ({ children, user }) => {
  return (
    <div className="min-h-screen">
      <nav>
        <div className="max-w-7xl">
          <div className="flex">
            <div>
              <Link to="/" className="logo">
                PulseVote
              </Link>
            </div>
            
            <div className="nav-links">
              <Link to="/">
                Home
              </Link>
              
              {user ? (
                <>
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                  <Link to="/logout">
                    Logout
                  </Link>
                  <span style={{color: 'white', fontSize: '0.875rem'}}>
                    Welcome, {user.email}
                  </span>
                </>
              ) : (
                <>
                  <Link to="/register">
                    Register
                  </Link>
                  <Link to="/login">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl py-6 px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;