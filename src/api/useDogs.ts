'use client';
import { useState, useEffect } from 'react';

interface Dog {
  imageUrl: string;
  name: string;
  age: number;
  gender: 'female' | 'male';
  color: 'yellow' | 'striped';
}

interface ApiResponse {
  message: string[];
  status: string;
}

const dogNames = ['Max', 'Luna', 'Rocky', 'Bella', 'Duke', 'Daisy', 'Thor', 'Molly'];
const ARTIFICIAL_DELAY = 1000; // 1 second delay

export const useDogs = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDogs = async (breed: string | null) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add artificial delay
      await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
      
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const data: ApiResponse = await response.json();
      
      if (data.status === 'success') {
        const enrichedDogs: Dog[] = data.message.map(imageUrl => ({
          imageUrl,
          name: dogNames[Math.floor(Math.random() * dogNames.length)],
          age: Math.floor(Math.random() * 12) + 1, // 1-12 years
          gender: Math.random() > 0.5 ? 'male' : 'female',
          color: Math.random() > 0.5 ? 'yellow' : 'striped'
        }));
        
        setDogs(enrichedDogs);
      } else {
        throw new Error('Failed to fetch Dogs images');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    dogs,
    isLoading,
    error,
    fetchDogs
  };
};
