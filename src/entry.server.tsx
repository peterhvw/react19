import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import { createRequestHandler } from '@shopify/remix-oxygen';

export default createRequestHandler({
  // Handles SSR
  handleRequest: async (request, responseStatusCode, headers) => {
    const markup = renderToString(
      <RemixServer 
        context={{}}
        url={request.url}
      />
    );

    return new Response(markup, {
      headers: {
        'Content-Type': 'text/html',
      },
      status: responseStatusCode,
    });
  },
}); 