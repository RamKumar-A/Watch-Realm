import { useNavigate } from 'react-router-dom';

import Button from '../../ui/Button';

function CartSummary({ totalPrice }) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="bg-secondary-default p-6 rounded-lg shadow  ">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Cart Summary</h2>
        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <p className="text-gray-600">Subtotal</p>
          <p>₹ {totalPrice}</p>
        </div>
        <div className="flex justify-between mb-4 text-sm sm:text-base">
          <p className="text-gray-600">Shipping</p>
          <p>
            <span>Free </span>
            <span className="text-xs line-through opacity-50">₹50</span>
          </p>
        </div>
        <hr className="mb-4 text-highlight-dark" />
        <div className="flex justify-between text-md sm:text-lg font-bold">
          <p>Total</p>
          <p>₹ {totalPrice}</p>
        </div>
        <Button
          size="medium"
          rounded="small"
          onClick={() => navigate('/checkout')}
          className="w-full mt-4 "
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}

export default CartSummary;
