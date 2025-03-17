import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-purple-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-purple-700 font-bold text-xl">SharalarAI</Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className={`${location.pathname === '/' ? 'text-purple-800 font-medium' : 'text-gray-700'}`}>
            Home
          </Link>
          <Link to="/saved" className={`${location.pathname === '/saved' ? 'text-purple-800 font-medium' : 'text-gray-700'}`}>
            Saved events
          </Link>
          {/* <Link to="/profile" className={`${location.pathname === '/profile' ? 'text-purple-800 font-medium' : 'text-gray-700'}`}>
            Profile
          </Link> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;