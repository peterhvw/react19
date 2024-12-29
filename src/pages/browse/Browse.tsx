
import { Suspense, useState } from "react";
import Dogs from "../../components/dogs/Dogs";
import BreedSelector from "../../components/breeds/BreedSelector";
import Loader from "../../components/loader/Loader";


const Browse = () => {
  const [breed, setBreed] = useState<string>("boxer");
    return (
      <div>
        <Suspense fallback={<Loader />}> 
          <BreedSelector setBreed={setBreed} />
        </Suspense>
        <hr />
        <hr />
        <br />
        <Suspense fallback={<Loader />}> 
          <Dogs breed={breed} />
        </Suspense>
      </div>
    );
  };
  
export default Browse;
