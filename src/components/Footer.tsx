import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, SavedIcon, ProfileIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-100 p-2 md:hidden">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center text-purple-700 p-2">
          <HomeIcon />
        </Link>
        <Link to="/saved" className="flex flex-col items-center text-purple-700 p-2">
          <SavedIcon />
        </Link>
        {/* <Link to="/profile" className="flex flex-col items-center text-purple-700 p-2">
          <ProfileIcon />
        </Link> */}
      </div>
    </footer>
  );
};

export default Footer;