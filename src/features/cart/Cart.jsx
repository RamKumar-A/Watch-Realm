import CartItems from './CartItems';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import { useNavigate } from 'react-router-dom';
import Empty from '../../ui/Empty';
import BacktoShop from '../../ui/BacktoShop';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(getCart);

  return (
    <div>
      <BacktoShop />
      <div>
        <div className="grid sm:grid-cols-5 place-items-center place-content-center m-10 ">
          {cart.length !== 0 ? (
            <>
              <h1 className="text-2xl col-span-3">Products</h1>
              <h1 className="text-2xl hidden sm:grid">Quantity</h1>
              <h1 className="text-2xl hidden sm:grid">Total</h1>
            </>
          ) : (
            <div className="col-span-5 place-content-center h-full">
              <Empty>Your cart is empty</Empty>
            </div>
          )}
        </div>
        <div className="p-6 m-4">
          {cart.map((items) => (
            <CartItems items={items} key={items.name} />
          ))}
        </div>
        {cart.length !== 0 ? (
          <>
            <button
              className="mx-14 text-xl"
              onClick={() => dispatch(clearCart())}
            >
              RemoveAll
            </button>
            <button onClick={() => navigate('/order/new')}>Buy</button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Cart;
