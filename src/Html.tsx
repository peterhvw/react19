interface HtmlProps {
  children: React.ReactNode;
  cssFiles?: string[];
  initialHomeData?: any;
  initialBrowseData?: any;
  initialPlpData?: any;
}

export default function Html({ children, cssFiles = [], initialHomeData, initialBrowseData, initialPlpData }: HtmlProps) {
  return (
    <html>
      <head>
        {cssFiles.map((file) => (
          <link key={file} rel="stylesheet" href={file} />
        ))}
      </head>
      <body>
        <div id="root">{children}</div>
        {initialHomeData && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_HOME_DATA__ = ${JSON.stringify(initialHomeData)};`,
            }}
          />
        )}
        {initialBrowseData && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_BROWSE_DATA__ = ${JSON.stringify(initialBrowseData)};`,
            }}
          />
        )}
        {initialPlpData && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_PLP_DATA__ = ${JSON.stringify(initialPlpData)};`,
            }}
          />
        )}
      </body>
    </html>
  );
}