
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

export const getDogs = async (breed: string) => {
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
      return enrichedDogs;
    } else {
      throw new Error('Failed to fetch dogs');
    }   
}
