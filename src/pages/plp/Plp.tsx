import ProductList from './ProductList';

import { Suspense } from 'react';



export default function PLP() {
  return (
    <div className="plp-container">
      <h1>Product Listing Page</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        { /* @ts-ignore */}
        <ProductList />
      </Suspense>
    </div>
  );
}
