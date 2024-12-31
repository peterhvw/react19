import { useWishlist } from '../../context/WishlistContext';
import * as styles from './WishlistSidebar.module.css';

// Add Product interface
interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

function WishlistSidebar() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Wishlist ({wishlist.length})</h2>
      {wishlist.map(product => (
        <div key={product.id} className={styles.productContainer}>
          <img 
            src={product.image} 
            alt={product.name} 
            className={styles.productImage}
          />
          <div className={styles.productInfo}>
            <p className={styles.productName}>{product.name}</p>
            <p className={styles.productPrice}>${product.price}</p>
          </div>
          <button
            onClick={() => removeFromWishlist(product.id)}
            className={styles.removeButton}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default WishlistSidebar; 