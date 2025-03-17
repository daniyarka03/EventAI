export interface Event {
    id: string;
    title: string;
    description: string;
    location: {
      city: string;
      venue: string;
    };
    startDate: string;
    endDate?: string;
    category: string[];
    isPublic: boolean;
    image?: string;
  }
  
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    savedEvents: string[];
  }