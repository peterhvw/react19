import { useEffect, useTransition } from "react";
import { useDogs } from "../../../api/useDogs";
import * as styles from "./Dogs.module.css";
import { Dog } from "../../../api/getDogs";
import Loader from "../loader/Loader";

function Dogs ({breed, initialDogs}: {breed: string | null, initialDogs: Dog[] | null}) {
  const { dogs, isLoading, fetchDogs } = useDogs();
  console.log(initialDogs)

  useEffect(() => {
    if (breed) {
        fetchDogs(breed);
    }
  }, [breed]);


  const allDogs = dogs.length > 0 ? dogs : initialDogs ?? [];

  return (
    <div className={styles.dogsContainer}>
      <div className={styles.dogsGrid}>
        {allDogs.slice(0, 24).map((dog) => (
          <div key={dog.imageUrl} className={styles.dogsCard}>
            <img className={styles.dogsImage} src={dog.imageUrl} alt={dog.name} />
            <div className={styles.dogsInfo}>
              <h3>{dog.name}</h3>
              <p>Age: {dog.age} years</p>
              <p>Gender: {dog.gender}</p>
              <p>Color: {dog.color}</p>
            </div>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className={styles.overlay}>
          <div className={styles.spinner}>
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dogs;
