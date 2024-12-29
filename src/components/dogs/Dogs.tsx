import { useEffect } from "react";
import { useDogs } from "../../api/useDogs";
// import styles from "./Dogs.module.css";
const styles = {
  dogsGrid: "dogsGrid",
  dogsCard: "dogsCard",
  dogsImage: "dogsImage",
  dogsInfo: "dogsInfo"
}

 function Dogs ({breed}: {breed: string}) {
  const { dogs, isLoading, error, fetchDogs } = useDogs({breed});

  useEffect(() => {
    fetchDogs();
  }, [breed]);

  if (isLoading) return null;
  if (error) return <div>Error: {error}</div>;



  return (
    <div className={styles.dogsGrid}>
      {dogs.slice(0, 24).map((dog, index) => (
        <div key={index} className={styles.dogsCard}>
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
  );
};

export default Dogs;
