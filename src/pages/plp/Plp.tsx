import ProductGrid from "../../components/old/ProductGrid";
import WishlistSidebar from "../../components/old/WishlistSidebar";

const PLP = () => {
  return (
    
      <div className="flex min-h-screen">
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-8">Our Products</h1>
          <ProductGrid />
        </main>
        <WishlistSidebar />
      </div>
 
  );
};

export default PLP;
