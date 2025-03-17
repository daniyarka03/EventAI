// src/services/userService.ts
import usersData from '../data/users';
import { User } from '../types';

// Load users data from localStorage if available, otherwise use static data
const loadUsersFromLocalStorage = (): User[] => {
  const storedUsers = localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : usersData;
};

// Save users data to localStorage
const saveUsersToLocalStorage = (updatedUsers: User[]): void => {
  localStorage.setItem('users', JSON.stringify(updatedUsers));
};

// Get the current user (in a real app, this would get the authenticated user)
export const getCurrentUser = (): User => {
  const users = loadUsersFromLocalStorage();
  // For now, we're just returning the first user in our static data
  return users[0];
};

// Save an event for a user
export const saveEvent = (userId: string, eventId: string): void => {
  const users = loadUsersFromLocalStorage();
  const user = users.find(u => u.id === userId);
  if (user && !user.savedEvents.includes(eventId)) {
    user.savedEvents.push(eventId);
    saveUsersToLocalStorage(users); // Save updated users to localStorage
  }
};

// Unsave (remove) an event for a user
export const unsaveEvent = (userId: string, eventId: string): void => {
  const users = loadUsersFromLocalStorage();
  const user = users.find(u => u.id === userId);
  if (user) {
    user.savedEvents = user.savedEvents.filter(id => id !== eventId);
    saveUsersToLocalStorage(users); // Save updated users to localStorage
  }
};

// Get all saved event IDs for a user
export const getSavedEvents = (userId: string): string[] => {
  const users = loadUsersFromLocalStorage();
  const user = users.find(u => u.id === userId);
  return user ? user.savedEvents : [];
};

// Update user profile (for future implementation)
export const updateUserProfile = (userId: string, updates: Partial<User>): User | null => {
  const users = loadUsersFromLocalStorage();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    // In a real app, we would validate the updates and save to a database
    users[userIndex] = { ...users[userIndex], ...updates };
    saveUsersToLocalStorage(users); // Save updated users to localStorage
    return users[userIndex];
  }
  return null;
};