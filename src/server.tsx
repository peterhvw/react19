import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import App from './App';
import Html from './Html';

const app = express();
const port = 3000;

// Read the manifest file to get the generated asset filenames
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'client/manifest.json'), 'utf-8')
);

app.use(express.static('dist/client'));

app.get('*', (req, res) => {
  const cssFiles = Object.keys(manifest)
    .filter(key => key.endsWith('.css'))
    .map(key => manifest[key]);
  
  const jsFiles = Object.keys(manifest)
    .filter(key => key.endsWith('.js'))
    .map(key => manifest[key]);

  const { pipe } = renderToPipeableStream(
    <Html cssFiles={cssFiles}>
      <StaticRouter location={req.url}>        
        <App />
      </StaticRouter>
    </Html>,
    {
      bootstrapScripts: jsFiles,
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        pipe(res);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});