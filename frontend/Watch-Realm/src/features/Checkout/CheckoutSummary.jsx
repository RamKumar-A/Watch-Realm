import { useStripeCheckout } from './useStripeCheckout';

import Button from '../../ui/Button';

function CheckoutSummary({ items, totalPrice }) {
  const { createStripeSession } = useStripeCheckout();

  const handleCheckout = async () => {
    createStripeSession({ items });
  };

  return (
    <div className="bg-secondary-default p-6 rounded-lg shadow sticky top-0">
      <h2 className="text-xl font-bold mb-4">Checkout Summary</h2>
      <div className="flex justify-between mb-2">
        <p className="text-gray-600">Subtotal</p>
        <p>₹ {totalPrice}</p>
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-gray-600">Shipping</p>
        <p>
          <span>Free </span>
          <span className="text-xs line-through opacity-40">₹50</span>
        </p>
      </div>
      <hr className="mb-4 text-highlight-dark" />

      <div className="flex justify-between text-lg font-bold">
        <p>Total</p>
        <p>₹ {totalPrice}</p>
      </div>
      <Button
        size="large"
        rounded="small"
        onClick={handleCheckout}
        className="w-full mt-4 "
      >
        Pay Now
      </Button>
    </div>
  );
}

export default CheckoutSummary;
