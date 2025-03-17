import React from 'react';
import { Event } from '../types';
import { Link } from 'react-router-dom';
import { BookmarkIcon, BookmarkFilledIcon } from './Icons';

interface EventCardProps {
  event: Event;
  isSaved: boolean;
  onToggleSave: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isSaved, onToggleSave }) => {
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="border-b py-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold mb-1">
            <Link to={`/event/${event.id}`} className="hover:text-purple-700">
              {event.title}
            </Link>
          </h3>
          <div className="text-gray-600 mb-1">
            {event.endDate ? 
              `${formatDate(event.startDate)} - ${formatDate(event.endDate)}` : 
              formatDate(event.startDate)
            }
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <span className="inline-block bg-red-100 w-3 h-3 rounded-full mr-1"></span>
            <span>{event.location.city}, {event.location.venue}</span>
          </div>
        
        </div>
        <div className='flex flex-col items-end'>
        <button 
          onClick={onToggleSave}
          className="text-purple-700 p-1"
          aria-label={isSaved ? "Remove from saved events" : "Save event"}
        >
          {isSaved ? <BookmarkFilledIcon /> : <BookmarkIcon />}
        </button>
        <div className="text-right">
            <span className="text-blue-500">{event.isPublic ? 'Public' : 'Private'}</span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;