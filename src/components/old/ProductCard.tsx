import { memo } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import * as styles from './ProductCard.module.css';

interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <div className={styles.card}>
      <img 
        src={product.image} 
        alt={product.name} 
        className={styles.image}
      />
      <h3 className={styles.title}>{product.name}</h3>
      <p className={styles.price}>${product.price}</p>
      <button
        onClick={() => isInWishlist 
          ? removeFromWishlist(product.id)
          : addToWishlist(product)
        }
        className={`${styles.button} ${
          isInWishlist 
            ? styles.buttonRemove
            : styles.buttonAdd
        }`}
      >
        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
});

export default ProductCard; 