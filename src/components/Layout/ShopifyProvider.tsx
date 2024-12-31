import { ShopifyProvider, useShop } from '@shopify/hydrogen';

export function ShopifyProviderWrapper({ children }) {
  return (
    <ShopifyProvider 
      shopifyConfig={{
        storeDomain: 'your-store.myshopify.com',
        storefrontToken: 'your-token',
        storefrontApiVersion: '2023-01',
      }}
    >
      {children}
    </ShopifyProvider>
  );
} 