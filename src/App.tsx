import { Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./home/Home'));
const Browse = lazy(() => import('./browse/Browse'));
const PLP = lazy(() => import('./plp/Plp'));

const App = () => {
  return (
    <div id="app">
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
              <Browse />
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
    </div>
  );
};

export default App;