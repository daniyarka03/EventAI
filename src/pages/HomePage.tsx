import React, { useState, useEffect } from 'react';
import { Event } from '../types';
import { getUpcomingEvents, filterEventsByCategory, searchEventsByText } from '../services/eventService';
import { getCurrentUser, getSavedEvents, saveEvent, unsaveEvent } from '../services/userService';
import { processNaturalLanguageQuery } from '../services/aiService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import EventCard from '../components/EventCard';

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortAscending, setSortAscending] = useState<boolean | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const allEvents = getUpcomingEvents();
      setEvents(allEvents);
      setFilteredEvents(allEvents);
      
      // Extract unique categories
      const allCategories = new Set<string>();
      allEvents.forEach(event => event.category.forEach(cat => allCategories.add(cat)));
      setCategories(Array.from(allCategories));
      
      // Get saved events
      const user = getCurrentUser();
      setSavedEventIds(getSavedEvents(user.id));
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredEvents(events);
      setSelectedCategory(null);
      return;
    }
    
    try {
      setLoading(true);
      
      // Use AI to process natural language query
      const nlpResult = await processNaturalLanguageQuery(query);
      
      if (nlpResult.textSearch) {
        // Fall back to basic text search
        const results = searchEventsByText(query);
        setFilteredEvents(results);
      } else {
        // Filter based on NLP parameters
        let results = events;
        
        if (nlpResult.date) {
          const dateStr = nlpResult.date;
          results = results.filter(event => {
            const eventStart = new Date(event.startDate).toISOString().split('T')[0];
            const eventEnd = event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : eventStart;
            return dateStr >= eventStart && dateStr <= eventEnd;
          });
        }
        
        if (nlpResult.timeOfDay === 'evening') {
          results = results.filter(event => {
            const hour = new Date(event.startDate).getHours();
            return hour >= 17;
          });
        }
        
        if (nlpResult.categories && nlpResult.categories.length > 0) {
          results = results.filter(event => 
            event.category.some(cat => nlpResult.categories.includes(cat))
          );
        }
        
        setFilteredEvents(results);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fall back to basic text search
      const results = searchEventsByText(query);
      setFilteredEvents(results);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
    
    if (category === null) {
      setFilteredEvents(events);
    } else {
      const filtered = filterEventsByCategory(category);
      setFilteredEvents(filtered);
    }
  };

  const handleSortByDate = (ascending: boolean) => {
    const sorted = [...filteredEvents].sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
    setFilteredEvents(sorted);
    setSortAscending(ascending);
  };

  const handleToggleSave = (eventId: string) => {
    const user = getCurrentUser();
    
    if (savedEventIds.includes(eventId)) {
      unsaveEvent(user.id, eventId);
      setSavedEventIds(savedEventIds.filter(id => id !== eventId));
    } else {
      saveEvent(user.id, eventId);
      setSavedEventIds([...savedEventIds, eventId]);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Events</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        <FilterBar 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onSortByDate={handleSortByDate}
          sortAscending={sortAscending}
        />
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            No events found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                isSaved={savedEventIds.includes(event.id)}
                onToggleSave={() => handleToggleSave(event.id)}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;