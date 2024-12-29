import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import {  Dog } from './api/getDogs';

const Home = lazy(() => import('./pages/home/Home'));
const Browse = lazy(() => import('./pages/browse/Browse'));
const PLP = lazy(() => import('./pages/plp/Plp'));


function App({ initialDogs = null }: { initialDogs?: Dog[] | null }) {
 

  return (
    <>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/plp">PLP</Link>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading home...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/browse"
          element={
            <Suspense fallback={<div>Loading browse...</div>}>
              <Browse initialDogs={initialDogs} />
            </Suspense>
          }
        />
        <Route
          path="/plp"
          element={
            <Suspense fallback={<div>Loading plp...</div>}>
              <PLP />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default App;