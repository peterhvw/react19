import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { Dog } from './api/getDogs';
import { Navigation } from './components/Navigation';
import { routes } from './routes';

function App({ initialDogs = null }: { initialDogs?: Dog[] | null }) {
  return (
    <>
      <Navigation />
      <Routes>
        {routes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<div>Loading {path}...</div>}>
                <Element initialDogs={path === '/browse' ? initialDogs : undefined} />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default App;