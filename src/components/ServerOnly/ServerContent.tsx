import { useServerProps } from '@shopify/hydrogen';

// This component ONLY runs on the server
export function ServerContent({ children }) {
  // useServerProps only works server-side
  const { serverProps } = useServerProps();
  
  return (
    <div data-server-component>
      {children}
    </div>
  );
} 