'use client'
import { Suspense, use, useState } from "react";
import Dogs from "../../components/dogs/Dogs";
import BreedSelector from "../../components/breeds/BreedSelector";
import Loader from "../../components/loader/Loader";
import { Dog } from "../../api/getDogs";
import DogsSuspended from "../../components/dogs/DogsSuspended";



const Browse = ({initialDogs}: {initialDogs:  Dog[] | null}) => {
  const [breed, setBreed] = useState<string|null>(null);

  return (
    <div>
      <h1>Browse</h1>
      <>
      <BreedSelector setBreed={setBreed} />
      <hr />
      <hr />
      <br />
      {/* <Suspense fallback={<Loader />}>
        <DogsSuspended breed={breed} initialDogs={initialDogs} />
      </Suspense> */}

      <hr />
      <hr />
      <br />
        <Dogs breed={breed} initialDogs={initialDogs} />
    </>
    </div>
  );
};
  
export default Browse;
