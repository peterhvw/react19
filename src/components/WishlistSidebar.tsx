import { useWishlist } from '../context/WishlistContext';

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
    <div className="w-64 border-l p-4">
      <h2 className="font-bold text-xl mb-4">Wishlist ({wishlist.length})</h2>
      {wishlist.map(product => (
        <div key={product.id} className="flex items-center gap-2 mb-2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-12 h-12 object-cover"
          />
          <div className="flex-1">
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-gray-600">${product.price}</p>
          </div>
          <button
            onClick={() => removeFromWishlist(product.id)}
            className="text-red-500"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default WishlistSidebar; 