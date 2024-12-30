import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import ServerApp from './ServerApp';

const app = express();
const port = 3000;




// Read the manifest file to get the generated asset filenames
const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'client/manifest.json'), 'utf-8')
);

app.use(express.static('dist/client'));

app.get('*', async (req, res) => {
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

  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
        { /* @ts-ignore */ }        
        <ServerApp cssFiles={cssFiles} />
      </StaticRouter>
    ,
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