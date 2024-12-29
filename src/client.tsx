import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Html from './Html';
// @ts-ignore
import { createFromReadableStream } from 'react-server-dom-webpack/client';

// Get the initial data and RSC payload from the window
const initialDogs = (window as any).__INITIAL_DATA__;
const rscPayload = (window as any).__RSC_PAYLOAD__;

// Create a readable stream from the RSC payload
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue(rscPayload);
    controller.close();
  },
});

// Convert the RSC stream into React elements
createFromReadableStream(stream).then((ReactTree: any) => {
  hydrateRoot(
    document,
    <Html initialData={initialDogs}>
      <BrowserRouter>
        <App initialDogs={initialDogs} />
      </BrowserRouter>
    </Html>
  );
});


// import { hydrateRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import Html from './Html';

// // Get the initial data from a script tag or window object
//   const initialDogs = (window as any).__INITIAL_DATA__;

// hydrateRoot(
//   document,
//   <Html initialData={initialDogs}>  
//     <BrowserRouter>
//       <App initialDogs={initialDogs} />
//     </BrowserRouter>
//   </Html>
// );
