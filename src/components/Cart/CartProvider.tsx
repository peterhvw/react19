import { CartProvider, useCart } from '@shopify/hydrogen';

export function ShopifyCart() {
  return (
    <CartProvider>
      <CartContents />
    </CartProvider>
  );
}

function CartContents() {
  const { lines, cost, checkoutUrl } = useCart();
  
  return (
    <ClientContent>
      {/* Cart is always client-side */}
      <div className="cart">
        {lines.map(line => (
          <CartLine key={line.id} line={line} />
        ))}
        <p>Total: {cost.totalAmount.amount}</p>
        <a href={checkoutUrl}>Checkout</a>
      </div>
    </ClientContent>
  );
} 