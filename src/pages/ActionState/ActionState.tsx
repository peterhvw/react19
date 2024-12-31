import { useActionState } from "react";
import Loader from "../../components/loader/Loader";
import ProductCard from "../../components/ProductCard";

const mockProducts = [
    { id: 1, name: 'Wireless Earbuds', price: 45, category: 'electronics' },
    { id: 2, name: 'T-Shirt', price: 25, category: 'clothing' },
    { id: 3, name: 'Smart Watch', price: 150, category: 'electronics' },
    { id: 4, name: 'Jeans', price: 75, category: 'clothing' },
    { id: 5, name: 'Laptop', price: 899, category: 'electronics' },
    { id: 6, name: 'Hoodie', price: 55, category: 'clothing' },
    { id: 7, name: 'Bluetooth Speaker', price: 85, category: 'electronics' },
    { id: 8, name: 'Dress', price: 95, category: 'clothing' },
  ];

export default function ProductFiltering() {
    // useActionState takes a function and initial state
    const [filterState, filterAction, isPending] = useActionState(
      async (previousState: any, filterParams: any) => {
        try {
          // Simulate API call
          const results = await fetchFilteredProducts(filterParams);
          return {
            products: results,
            error: null
          };
        } catch (error) {
          return {
            products: previousState.products,
            error: 'Failed to filter products'
          };
        }
      },
      { products: [], error: null }
    );
  
    return (
      <div>
        <form action={filterAction}>
          {/* Price Range Filter */}
          <div>
            <label>Price Range:</label>
            <select name="priceRange">
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101+">$101+</option>
            </select>
          </div>
  
          {/* Category Filter */}
          <div>
            <label>Category:</label>
            <select name="category">
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
  
          <button type="submit" disabled={isPending}>
            {isPending ? 'Filtering...' : 'Apply Filters'}
          </button>
        </form>
  
        {filterState.error && (
          <div className="error">{filterState.error}</div>
        )}
  
        <div className="products-grid">
          {isPending ? (
            <Loader />
          ) : (
            filterState.products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    );
  }
  
  // Simulated API call
  async function fetchFilteredProducts(filterParams: FormData | any) {
    // Check if filterParams is a FormEvent and get FormData
    const formData = filterParams instanceof FormData 
      ? filterParams 
      : new FormData(filterParams.target);
      
    const priceRange = formData.get('priceRange');
    const category = formData.get('category');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, this would be an API call
    return mockProducts.filter((product: any) => {
      const [min, max] = (priceRange as string)?.split('-') || [];
      const price = product.price;
      const matchesPrice = 
        (min === '0' && price <= 50) ||
        (min === '51' && price > 50 && price <= 100) ||
        (min === '101' && price > 100);
      
      const matchesCategory = 
        category === 'all' || 
        product.category === category;
      
      return matchesPrice && matchesCategory;
    });
  }