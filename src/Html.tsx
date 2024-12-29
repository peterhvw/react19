interface HtmlProps {
  children: React.ReactNode;
  cssFiles?: string[];
  initialData?: any;
}

export default function Html({ children, cssFiles = [], initialData }: HtmlProps) {
  return (
    <html>
      <head>
        {cssFiles.map((file) => (
          <link key={file} rel="stylesheet" href={file} />
        ))}
      </head>
      <body>
        <div id="root">{children}</div>
        {initialData && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_DOGS__ = ${JSON.stringify(initialData)};`,
            }}
          />
        )}
      </body>
    </html>
  );
}