import { useSelector, useDispatch } from 'react-redux';
import { getCart, clearCart } from './cartSlice';
import { useNavigate } from 'react-router-dom';

function PriceDetails({ checkoutButtons = true }) {
  const cartItems = useSelector(getCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems
    .map((cart) => cart.price_range * cart.quantity)
    .reduce((cur, acc) => cur + acc, 0);
  return (
    <>
      <div className="px-3 py-2 space-y-2 w-full h-full text-gray-950">
        <h1 className="text-lg font-medium">Price Details</h1>
        <hr />
        <section className="w-full  space-y-4">
          <div className="w-full flex items-center justify-between gap-2">
            <h6>
              Price{' '}
              <span className="text-xs font-medium">
                ({cartItems?.length} items)
              </span>
            </h6>
            <div>
              {' '}
              <span className="text-xs">$</span> {totalPrice}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <h6>Discount</h6>
            <div>
              -<span className="text-xs p-0.5">$</span>400
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <h6>Delivery Charges</h6>
            <div className="">
              <span className="line-through opacity-50 text-xs">
                <span>$</span> 33
              </span>
              <span className="text-md font-semibold"> Free</span>
            </div>
          </div>
        </section>
        <hr />
        <h1 className="w-full py-3  flex justify-between text-xl font-bold">
          <span>Total Amount</span>
          <span>
            <span className="text-sm">$</span> {totalPrice - 400}
          </span>
        </h1>
        <hr />

        <h3 className="font-bold tracking-wide text-green-600 text-md">
          You will save <span className="text-xs">$</span>
          {400} on this order
        </h3>
      </div>
      {/* <hr /> */}

      {checkoutButtons && (
        <div className="flex items-center justify-evenly p-2 w-full gap-2 text-gray-50 font-medium ">
          <button
            className="w-1/2 p-2 bg-orange-500 rounded-sm"
            onClick={() => navigate('/order/new')}
          >
            Checkout
          </button>
          <button
            className="w-1/2 p-2 rounded-sm bg-red-600 "
            onClick={() => dispatch(clearCart())}
          >
            Remove all
          </button>
        </div>
      )}
    </>
  );
}

export default PriceDetails;
