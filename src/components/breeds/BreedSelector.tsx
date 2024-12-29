'use client';
import { useBreeds } from '../../api/useBreeds';
import * as styles from './BreedSelector.module.css';
 

interface BreedSelectorProps {
  setBreed: (breed: string) => void;
}

const BreedSelector = ({ setBreed }: BreedSelectorProps) => {
  const { breeds } = useBreeds();

  return (
    <div className={styles.selectContainer}>
      <select 
        onChange={(e) =>  setBreed(e.target.value)}
        className={styles.select}
      >
        <option value="">Select a breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedSelector;
