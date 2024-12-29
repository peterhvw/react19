import { useState, useEffect } from 'react';

interface DogApiResponse {
  message: {
    [key: string]: string[];
  };
  status: string;
}

export const useBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data: DogApiResponse = await response.json();
        
        // Extract just the breed names (object keys) into an array
        const breedList = Object.keys(data.message);
        
        // Artificial delay of 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setBreeds(breedList);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch breeds');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  return { breeds, isLoading, error };
};

