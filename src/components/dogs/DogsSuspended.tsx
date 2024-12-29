import { useEffect, useTransition } from "react";
import { useSuspendableDogs } from "../../api/useSuspendableDogs";
import * as styles from "./Dogs.module.css";
import { Dog } from "../../api/getDogs";

function Dogs ({breed, initialDogs}: {breed: string | null, initialDogs: Dog[] | null}) {

  const dogs = useSuspendableDogs(breed);
  const allDogs =  dogs || initialDogs || [];

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
    </div>
  );
};

export default Dogs;
