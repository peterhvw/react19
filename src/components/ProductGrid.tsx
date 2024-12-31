import ProductCard from './ProductCard';
import * as styles from './ProductGrid.module.css';

// Define the Product type
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Gaming Laptop', price: 1299, image: 'laptop.jpg' },
  { id: 2, name: 'Wireless Headphones', price: 199, image: 'headphones.jpg' },
  { id: 3, name: 'Mechanical Keyboard', price: 159, image: 'keyboard.jpg' },
  // Add more products...
];

function ProductGrid() {
  return (
    <div className={styles.productGrid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid; 