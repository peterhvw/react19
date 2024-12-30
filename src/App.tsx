import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { Dog } from './api/getDogs';
import { Navigation } from './components/Navigation';
import { routes } from './routes';

function App({ initialHomeData = null, initialBrowseData = null, initialPlpData = null }: { initialHomeData?: null, initialBrowseData?: Dog[] | null, initialPlpData?: null }) {
  return (
    <>
      <Navigation />
      <Routes>
        {routes(initialHomeData, initialBrowseData, initialPlpData).map(({ path, element: Element, props }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<div>Loading {path}...</div>}>
                <Element {...props} />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default App;