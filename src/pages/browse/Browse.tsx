'use client'
import { Suspense, use, useEffect, useState } from "react";
import BreedSelector from "../../components/breeds/BreedSelector";
import Loader from "../../components/loader/Loader";
import { Dog } from "../../api/getDogs";
import Dogs from "../../components/dogs/Dogs";

// A component that fetches data
const fetchApiData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data loaded!');
    }, 2000); // Simulating a 2-second delay for data fetching
  });
};

// A component that uses Suspense to handle asynchronous data fetching
const DataComponent = () => {
  const apidata = use(fetchApiData()); // This can be any async function, like an API call
  const [newData, setNewData] = useState<string | null>(apidata);

  return <div>{newData}
  <button onClick={() => {
    fetchApiData().then(data => {
      setNewData(data);
    });
  }}>Fetch Data</button>
  </div>;
};


const Browse = ({initialBrowseData}: {initialBrowseData: Dog[] | null}) => {
  const [breed, setBreed] = useState<string|null>(null);

  return (
    <div>
      <h1>Browse</h1>
      <BreedSelector setBreed={setBreed} />
      <hr />
      <hr />
      <br />
      <Dogs breed={breed} initialDogs={initialBrowseData} />
      <Suspense fallback={<Loader />}>
          <DataComponent />
      </Suspense>
      <hr />
      <hr />
      <br />
    </div>
  );
};

export default Browse;
