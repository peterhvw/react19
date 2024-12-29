interface HtmlProps {
  children: React.ReactNode;
}

export default function Html({ children }: HtmlProps) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}