import { useSelector } from 'react-redux';
import CartItems from './CartItems';
import { getCart } from './cartSlice';
import { useNavigate } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CartModal() {
  const cart = useSelector(getCart);
  const navigate = useNavigate();
  const subTotal = cart
    .filter((item) => item.totalPrice)
    .reduce((cur, acc) => cur + acc.totalPrice, 0);

  return (
    <div className="overflow-y-auto h-full grid grid-rows-[auto_1fr_auto_auto]">
      <div>
        <h1 className="text-xl px-5 py-3 font-extrabold ">YOUR CART</h1>
      </div>
      <div className="overflow-y-auto h-[65vh] border">
        {cart.length !== 0 ? (
          cart.map((items) => (
            <CartItems className={true} items={items} key={items.id} />
          ))
        ) : (
          <Empty>Your cart is empty</Empty>
        )}
      </div>
      <div className="flex justify-between py-5">
        <h1 className="font-bold px-5 "> Subtotal</h1>
        <p className="px-5">$ {subTotal}</p>
      </div>
      <div className=" flex justify-betweem items-center gap-3 w-full px-3">
        {cart.length !== 0 && (
          <>
            <button
              onClick={() => navigate('/cart')}
              className="p-3 my-6 w-full mx-0 bg-amber-500 text-gray-200"
            >
              View Cart
            </button>
            <button
              onClick={() => navigate('/order/new')}
              className="p-3 my-6 mx-0 bg-orange-600 w-full text-gray-200"
            >
              Buy
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;
