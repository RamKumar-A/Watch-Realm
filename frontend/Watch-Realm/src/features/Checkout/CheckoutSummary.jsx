import { useStripeCheckout } from './useStripeCheckout';

import Button from '../../ui/Button';
import { useState } from 'react';
import { HiCreditCard } from 'react-icons/hi';
import { HiLockClosed } from 'react-icons/hi2';
import { FaStripe, FaStripeS } from 'react-icons/fa6';
import { BsCash, BsStripe } from 'react-icons/bs';

function CheckoutSummary({ items, totalPrice }) {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const { createStripeSession } = useStripeCheckout();

  const handleCheckout = async () => {
    createStripeSession({ items });
  };

  const codDisabled = true;

  return (
    <div className="bg-secondary-default p-6 rounded-lg shadow sticky top-0">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Checkout Summary</h2>
      <div className="flex justify-between mb-2 text-sm sm:text-base">
        <p className="text-gray-600">Subtotal</p>
        <p>₹ {totalPrice}</p>
      </div>
      <div className="flex justify-between mb-4 text-sm sm:text-base">
        <p className="text-gray-600">Shipping</p>
        <p>
          <span>Free </span>
          <span className="text-xs line-through opacity-40">₹50</span>
        </p>
      </div>
      <hr className="mb-4 text-highlight-dark" />

      <div className="flex justify-between text-md sm:text-lg font-bold">
        <p>Total</p>
        <p>₹ {totalPrice}</p>
      </div>

      {/* Payment Method */}
      <div className="my-8 p-4 border border-highlight-dark rounded-md">
        <div className="font-semibold mb-4 flex items-center gap-1.5">
          <span className="text-md sm:text-lg">Payment Method</span>
          <HiLockClosed size={14} />
        </div>
        <div className="flex items-center justify-start gap-5 flex-wrap py-3 text-gray-600">
          <label htmlFor="stripe" className="flex items-center gap-1.5">
            <input
              type="radio"
              name="stripe"
              id="stripe"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Stripe
            <BsStripe className="text-accent-primary" />
          </label>
          <label
            htmlFor="cod"
            className={`flex items-center gap-1.5 ${
              codDisabled && 'pointer-events-none opacity-70'
            }`}
          >
            <input
              type="radio"
              name="cod"
              id="cod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled={codDisabled}
            />
            COD
            <BsCash className="text-accent-primary" />
          </label>
        </div>
      </div>
      <Button
        size="medium"
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
