interface HtmlProps {
  children: React.ReactNode;
  cssFiles?: string[];
}

export default function Html({ children, cssFiles = [] }: HtmlProps) {
  return (
    <html>
      <head>
        {cssFiles.map((file) => (
          <link key={file} rel="stylesheet" href={file} />
        ))}
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}