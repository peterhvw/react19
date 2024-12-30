import ProductGrid from "../../components/ProductGrid";
import WishlistSidebar from "../../components/WishlistSidebar";
import { WishlistProvider } from "../../context/WishlistContext";

const PLP = () => {
  return (
    <WishlistProvider>
      <div className="flex min-h-screen">
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-8">Our Products</h1>
          <ProductGrid />
        </main>
        <WishlistSidebar />
      </div>
    </WishlistProvider>
  );
};

export default PLP;
