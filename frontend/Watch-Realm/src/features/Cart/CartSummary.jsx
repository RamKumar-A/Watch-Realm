import { useNavigate } from 'react-router-dom';

import Button from '../../ui/Button';

function CartSummary({ totalPrice }) {
  const navigate = useNavigate();

  return (
    <div className="bg-secondary-default p-6 rounded-lg shadow lg:flex-[1_1_0%]">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
      <div className="flex justify-between mb-2">
        <p className="text-gray-600">Subtotal</p>
        <p>₹ {totalPrice}</p>
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-gray-600">Shipping</p>
        <p>
          <span>Free </span>
          <span className="text-xs line-through opacity-50">₹50</span>
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
        onClick={() => navigate('/checkout')}
        className="w-full  mt-4 "
      >
        Place Order
      </Button>
    </div>
  );
}

export default CartSummary;
