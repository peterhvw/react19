import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Html from './Html';

hydrateRoot(
  document,
  <Html>  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Html>
);
