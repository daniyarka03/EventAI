import eventsData from '../data/events';
import { Event } from '../types';

export const getEvents = (): Event[] => {
  return eventsData;
};

export const getEventById = (id: string): Event | undefined => {
  return eventsData.find(event => event.id === id);
};

export const getEventsByDate = (date: Date): Event[] => {
  const dateStr = date.toISOString().split('T')[0];
  return eventsData.filter(event => {
    const startDate = new Date(event.startDate).toISOString().split('T')[0];
    const endDate = event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : startDate;
    return dateStr >= startDate && dateStr <= endDate;
  });
};

export const searchEventsByText = (query: string): Event[] => {
  const lowerCaseQuery = query.toLowerCase();
  return eventsData.filter(event => 
    event.title.toLowerCase().includes(lowerCaseQuery) ||
    event.description.toLowerCase().includes(lowerCaseQuery) ||
    event.category.some(cat => cat.toLowerCase().includes(lowerCaseQuery)) ||
    event.location.city.toLowerCase().includes(lowerCaseQuery) ||
    event.location.venue.toLowerCase().includes(lowerCaseQuery)
  );
};

export const filterEventsByCategory = (category: string): Event[] => {
  return eventsData.filter(event => 
    event.category.some(cat => cat.toLowerCase() === category.toLowerCase())
  );
};

export const getUpcomingEvents = (): Event[] => {
  const now = new Date();
  return eventsData.filter(event => new Date(event.startDate) >= now || 
    (event.endDate && new Date(event.endDate) >= now))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
};

