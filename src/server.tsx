import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import Html from './Html';

const app = express();
const port = 3000;

app.use(express.static('dist/client'));

app.get('*', (req, res) => {
  const { pipe } = renderToPipeableStream(
    <Html>
      <StaticRouter location={req.url}>        
        <App />
      </StaticRouter>
    </Html>
    ,
    {
      bootstrapScripts: ['/client.js'],
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