import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import App from './App';
import Html from './Html';
import { Dog, getDogs } from './api/getDogs';
import stream from 'stream';
import { finished } from 'stream/promises';
import React from 'react';

const app = express();
const port = 3000;

// Read the manifest file to get the generated asset filenames
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'client/manifest.json'), 'utf-8')
);

app.use(express.static('dist/client'));

function renderReactTree(writable: stream.Writable, Component: React.ComponentType<any>, props: any) {
  const { pipe } = renderToPipeableStream(
    React.createElement(Component, props),
    {
      // We'll use only the valid options from RenderToPipeableStreamOptions
      onShellReady() {}, // Optional: handle when the shell is ready
      onShellError() {}, // Optional: handle errors during shell rendering
      onAllReady() {},   // Optional: handle when all content is ready
      onError() {}       // Optional: handle general errors
    }
  );
  pipe(writable);
}

app.get('*', async (req, res) => {
  try {
    // Fetch initial data (unchanged)
    let initialDogs: Dog[] | null = null;
    if (req.url.startsWith('/browse')) {
      try {
        initialDogs = await getDogs("boxer");
      } catch (error) {
        console.error('Failed to fetch initial dogs:', error);
      }
    }

    // First render (RSC)
    let flightResponse = '';
    const flightStream = new stream.Writable({
      write: (chunk, encoding, next) => {
        flightResponse += chunk;
        next();
      }
    });

    // Wrap App in StaticRouter for the RSC render
    renderReactTree(flightStream, () => (
      <StaticRouter location={req.url}>
        <App initialDogs={initialDogs} />
      </StaticRouter>
    ), {});
    await finished(flightStream);

    const route = req.url.split('/')[1] || 'home';

    // Filter assets based on route name
    const routeSpecificFiles = (files: string[]) => {
      return files.filter(file => 
        file.includes(`${route}`) || file.includes('vendor.') || file.includes('main.')
      );
    };

    const allCssFiles = Object.keys(manifest)
      .filter(key => key.endsWith('.css'))
      .map(key => manifest[key]);

    const allJsFiles = Object.keys(manifest)
      .filter(key => key.endsWith('.js'))
      .map(key => manifest[key]);

    // Filter files specific to the current route
    const cssFiles = routeSpecificFiles(allCssFiles);
    const jsFiles = routeSpecificFiles(allJsFiles);

    // Final HTML render
    const { pipe } = renderToPipeableStream(
      <Html 
        cssFiles={cssFiles} 
        initialData={initialDogs}
        rscPayload={JSON.stringify(flightResponse)}
      >
        <StaticRouter location={req.url}>
          <App initialDogs={initialDogs} />
        </StaticRouter>
      </Html>,
      {
        bootstrapScripts: jsFiles,
        onShellReady() {
          res.setHeader('content-type', 'text/html');
          pipe(res);
        },
        onError(error) {
          console.error('Render error:', error);
          res.status(500).send('Internal Server Error');
        }
      }
    );
  } catch (error) {
    console.error('Server render error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});