import { useState, useEffect } from 'react';

interface Dog {
  imageUrl: string;
  name: string;
  age: number;
  gender: string;
  color: string;
}

interface ApiResponse {
  message: string[];
  status: string;
}

const dogNames = ['Max', 'Luna', 'Rocky', 'Bella', 'Duke', 'Daisy', 'Thor', 'Molly'];
const ARTIFICIAL_DELAY = 1000;

// Cache for storing promises
const cache = new Map<string, Promise<Dog[]>>();

async function fetchBreedImages(breed: string): Promise<Dog[]> {
  await new Promise(r => setTimeout(r, ARTIFICIAL_DELAY));
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  const data: ApiResponse = await response.json();
  
  if (data.status === 'success') {
    return data.message.map(imageUrl => ({
      imageUrl,
      name: dogNames[Math.floor(Math.random() * dogNames.length)],
      age: Math.floor(Math.random() * 12) + 1,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      color: Math.random() > 0.5 ? 'yellow' : 'striped'
    }));
  }
  return [];
}



 

export function useSuspendableDogs(breed: string | null): Dog[] {
  if (!breed) return [];

  let cached = cache.get(breed);
  if (!cached) {
    cached = fetchBreedImages(breed);
    cache.set(breed, cached);
  }

  // Create a throw-able error with the promise attached
  const error: any = new Error("Loading...");
  error.promise = cached;

  // Try to get the resolved value
  try {
    // @ts-ignore - this is a hack to check if promise is resolved
    if (cached.status === 'fulfilled') {
      // @ts-ignore - access the resolved value
      return cached.value;
    }
    throw error;
  } catch (e) {
    if (e === error) {
      throw e;
    }
    // If we get here, the promise is resolved but threw an error
    return [];
  }
}
