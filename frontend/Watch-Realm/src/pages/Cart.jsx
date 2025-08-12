import { useNavigate } from 'react-router-dom';

import { useCart } from '../features/Cart/useCart';
import CartItems from '../features/Cart/CartItems';
import CartSummary from '../features/Cart/CartSummary';

import Button from '../ui/Button';

export default function Cart() {
  const navigate = useNavigate();

  const { cart } = useCart();

  const cartItems = cart?.data.items;
  const totalPrice = cart?.data.totalPrice;

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {!cartItems || cartItems?.length === 0 ? (
        <div className="bg-secondary-light p-6 rounded-lg shadow text-center space-y-4">
          <p className="">Your cart is empty.</p>

          <Button onClick={() => navigate('/shop')}>Go to Shop</Button>
        </div>
      ) : (
        <div className="lg:flex flex-wrap gap-6 w-full justify-center max-lg:space-y-8 ">
          {/* Cart Items */}
          <CartItems />

          {/* Summary Section */}
          <div className="lg:sticky top-0 lg:flex-[1_1_0%] ">
            <CartSummary totalPrice={totalPrice} />
          </div>
        </div>
      )}
    </div>
  );
}
