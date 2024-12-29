import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Html from './Html';

// Get the initial data from a script tag or window object
const initialDogs = (window as any).__INITIAL_DOGS__;

hydrateRoot(
  document,
  <Html>  
    <BrowserRouter>
      <App initialDogs={initialDogs} />
    </BrowserRouter>
  </Html>
);
