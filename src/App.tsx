import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SavedEventsPage from './pages/SavedEventsPage';
import ProfilePage from './pages/ProfilePage';
import EventDetailPage from './pages/EventDetailPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/saved" element={<SavedEventsPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/event/:id" element={<EventDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;