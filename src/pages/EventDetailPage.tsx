import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Event } from '../types';
import { getEventById } from '../services/eventService';
import { getCurrentUser, getSavedEvents, saveEvent, unsaveEvent } from '../services/userService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookmarkIcon, BookmarkFilledIcon } from '../components/Icons';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const eventData = getEventById(id);
      setEvent(eventData || null);
      
      const user = getCurrentUser();
      const savedEventIds = getSavedEvents(user.id);
      setIsSaved(savedEventIds.includes(id));
      
      setLoading(false);
    }
  }, [id]);

  const handleToggleSave = () => {
    if (!event) return;
    
    const user = getCurrentUser();
    
    if (isSaved) {
      unsaveEvent(user.id, event.id);
      setIsSaved(false);
    } else {
      saveEvent(user.id, event.id);
      setIsSaved(true);
    }
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center py-8">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center py-8 text-gray-600">
            Event not found.
            <div className="mt-4">
              <Link to="/" className="text-purple-600 hover:underline">
                Return to home page
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow">
          {event.image && (
            <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
              <div className="text-gray-500">Event image placeholder</div>
            </div>
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
              <button 
                onClick={handleToggleSave}
                className="text-purple-700 p-1"
                aria-label={isSaved ? "Remove from saved events" : "Save event"}
              >
                {isSaved ? <BookmarkFilledIcon /> : <BookmarkIcon />}
              </button>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center text-gray-600 mb-2">
                <span className="inline-block bg-red-100 w-3 h-3 rounded-full mr-1"></span>
                <span>{event.location.city}, {event.location.venue}</span>
              </div>
              
              <div className="text-gray-600 mb-4">
                {event.endDate ? 
                  `${formatDate(event.startDate)} - ${formatDate(event.endDate)}` : 
                  formatDate(event.startDate)
                }
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {event.category.map(cat => (
                  <span 
                    key={cat} 
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </span>
                ))}
                <span 
                  className={`${
                    event.isPublic ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  } px-3 py-1 rounded-full text-sm`}
                >
                  {event.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
              
              <div className="prose max-w-none">
                <p>{event.description}</p>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Link to="/" className="text-purple-600 hover:underline">
                  Back to events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetailPage;