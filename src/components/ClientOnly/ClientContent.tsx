import { useEffect, useState } from 'react';

// This component ONLY runs on the client
export function ClientContent({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until client-side
  if (!isMounted) return null;

  return (
    <div data-client-component>
      {children}
    </div>
  );
} 