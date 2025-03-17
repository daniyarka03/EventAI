import React from 'react';
import { getCurrentUser } from '../services/userService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {ProfileIcon} from '../components/Icons';

const ProfilePage: React.FC = () => {
  const user = getCurrentUser();

  return (
    <div className="min-h-screen bg-purple-50 pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-purple-100 p-4 rounded-full">
              <ProfileIcon />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Account Information</h3>
            <p className="text-gray-600">User ID: {user.id}</p>
            <p className="text-gray-600">Saved Events: {user.savedEvents.length}</p>
          </div>
          
          <div className="mt-6 text-gray-500 text-sm">
            More profile features will be available in future updates.
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;