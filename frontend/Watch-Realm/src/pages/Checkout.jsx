import { useCart } from '../features/Cart/useCart';

import CheckoutReview from '../features/Checkout/CheckoutReview';
import CheckoutSummary from '../features/Checkout/CheckoutSummary';

function Checkout() {
  const { cart } = useCart();

  const totalPrice = cart?.data.totalPrice;
  const cartItems = cart?.data.items;

  return (
    <div className=" p-4 md:p-8 relative">
      <div>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      </div>
      {/* <div className="grid lg:grid-cols-[2fr_1fr] gap-4 "> */}
      <div className="md:flex flex-wrap gap-6 w-full justify-center max-md:space-y-2">
        <div className="p-2 sm:p-4 md:p-6 shadow rounded-lg bg-secondary-light/15 md:flex-[1_1_25%] ">
          <h2 className="text-xl font-bold mb-4">Review your cart</h2>
          <CheckoutReview items={cartItems} />
        </div>
        <div className="lg:sticky top-2 md:flex-[1_1_0%]">
          <CheckoutSummary items={cartItems} totalPrice={totalPrice} />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Checkout;
