interface HtmlProps {
  children: React.ReactNode;
  cssFiles?: string[];
  initialData: any;
  rscPayload?: string;
}

export default function Html({ children, cssFiles = [], initialData, rscPayload }: HtmlProps) {
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
              __html: `window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}`
            }}
          />
        )}
        {rscPayload && (
          <script
            id="react-flight"
            type="react/flight"
            dangerouslySetInnerHTML={{
              __html: rscPayload
            }}
          />
        )}
      </body>
    </html>
  );
}