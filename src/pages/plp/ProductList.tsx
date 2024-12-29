async function getProducts() {
    // Simulate fetching products from a database
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: 1, name: 'Product 1', price: 99.99 },
      { id: 2, name: 'Product 2', price: 149.99 },
      { id: 3, name: 'Product 3', price: 199.99 },
    ];
  }
  
  export default async function ProductList() {
    const products = await getProducts();
    
    return (
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    );
  }