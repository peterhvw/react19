import { cache } from 'react';

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
const ARTIFICIAL_DELAY = 1000; // 1 second delay

// Cache the fetch promise
const fetchDogsData = cache(async (breed: string | null) => {
  // Add artificial delay
  await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY));
  
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
  throw new Error('Failed to fetch Dogs images');
});

export function useSuspendableDogs(breed: string | null): Dog[] {
  if (!breed) return [];
  
  // Get the promise from the cached function
  const promise = fetchDogsData(breed);
  
  // Read the current status of the promise
  const status = promise as any;
  
  // If the promise is pending, throw it for Suspense to catch
  if (status.status === 'pending') {
    throw promise;
  }
  
  // If the promise was rejected, throw the error
  if (status.status === 'rejected') {
    throw status.value;
  }
  
  // If the promise was fulfilled, return the value
  return status.value;
}
