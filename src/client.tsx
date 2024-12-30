import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Html from './Html';

// Get the initial data from a script tag or window object
const initialHomeData = (window as any).__INITIAL_HOME_DATA__;
const initialBrowseData = (window as any).__INITIAL_BROWSE_DATA__;
const initialPlpData = (window as any).__INITIAL_PLP_DATA__;

hydrateRoot(
  document,
  <Html>  
    <BrowserRouter>
      <App initialHomeData={initialHomeData} initialBrowseData={initialBrowseData} initialPlpData={initialPlpData} />
    </BrowserRouter>
  </Html>, {
      onUncaughtError: (error, errorInfo) => {
        console.error('Uncaught error:', error);
        console.error('Error info:', errorInfo);
      },
      onCaughtError: (error, errorInfo) => {
        console.error('Caught error:', error);
        console.error('Error info:', errorInfo);
      }
  }
);
