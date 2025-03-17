import React, { useState, useEffect } from 'react';
import { Event } from '../types';
import { getEventById } from '../services/eventService';
import { getCurrentUser, getSavedEvents, unsaveEvent } from '../services/userService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';

const SavedEventsPage: React.FC = () => {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSavedEvents = () => {
      const user = getCurrentUser();
      const savedEventIds = getSavedEvents(user.id);
      
      const events = savedEventIds
        .map(id => getEventById(id))
        .filter((event): event is Event => event !== undefined);
      
      setSavedEvents(events);
      setLoading(false);
    };
    
    loadSavedEvents();
  }, []);

  const handleUnsaveEvent = (eventId: string) => {
    const user = getCurrentUser();
    unsaveEvent(user.id, eventId);
    setSavedEvents(savedEvents.filter(event => event.id !== eventId));
  };

  return (
    <div className="min-h-screen bg-purple-50 pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Saved Events</h1>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : savedEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            You haven't saved any events yet.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            {savedEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                isSaved={true}
                onToggleSave={() => handleUnsaveEvent(event.id)}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedEventsPage;