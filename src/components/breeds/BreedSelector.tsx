import { FC } from 'react';
import { useBreeds } from '../../api/useBreeds';
// import styles from './BreedSelector.module.css';
const styles = {
  selectContainer: "selectContainer",
  select: "select"
}

interface BreedSelectorProps {
  setBreed: (breed: string) => void;
}

const BreedSelector: FC<BreedSelectorProps> = ({ setBreed }) => {
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
