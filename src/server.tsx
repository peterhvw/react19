import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { Suspense } from 'react';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('dist/client'));

// HTML template function
const template = (content: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React SSR App</title>
  </head>
  <body>
    <div id="root">${content}</div>
    <script src="/client.js"></script>
  </body>
</html>
`;

app.get('*', (req, res) => {
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </StaticRouter>,
    {
      bootstrapScripts: ['/client.js'],
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        pipe(res);
      },
      onError(error) {
        console.error(error);
        res.status(500).send('Something went wrong');
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});