import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Html from './Html';
import { Suspense } from 'react';
import { routes } from './routes';
import { Navigation } from './components/Navigation';

// Get the initial data from a script tag or window object
// const initialData = (window as any).__INITIAL_DATA__;

hydrateRoot(
  document,
  <Html>  
    <BrowserRouter>
    <Navigation />
      <Routes>
        {routes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<div>Loading {path}...</div>}>
                <Element  />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  </Html>
);
