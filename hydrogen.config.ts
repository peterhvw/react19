import { defineConfig } from '@shopify/hydrogen';

export default defineConfig({
  shopify: {
    defaultCountryCode: 'US',
    defaultLanguageCode: 'EN',
    storeDomain: 'your-store.myshopify.com',
    storefrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
    storefrontApiVersion: '2023-01',
  },
  session: {
    storage: 'memory', // or 'redis', 'mysql', etc.
  },
  serverAnalytics: {
    shopify: true,
  },
}); 