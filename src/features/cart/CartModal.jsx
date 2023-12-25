import { useSelector } from 'react-redux';
import CartItems from './CartItems';
import { getCart } from './cartSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EmptyCart from './EmptyCart';

const Button = styled.button`
  /* border: 1px solid red; */
  padding: 0.5rem;
  margin: 1.5rem 0;
`;

function CartModal() {
  const cart = useSelector(getCart);
  const navigate = useNavigate();
  const subTotal = cart
    .filter((item) => item.totalPrice)
    .reduce((cur, acc) => cur + acc.totalPrice, 0);

  return (
    <div className="overflow-y-auto h-full">
      <div>
        <h1 className="text-xl px-5 py-3 font-extrabold ">YOUR CART</h1>
      </div>
      <div className="overflow-y-auto h-[65vh] border">
        {cart.length !== 0 ? (
          cart.map((items) => (
            <CartItems className={true} items={items} key={items.id} />
          ))
        ) : (
          <div className="flex items-center h-full justify-center w-full ">
            <EmptyCart />
          </div>
        )}
      </div>
      <div className="flex justify-between py-5">
        <h1 className="font-bold px-5 "> Subtotal</h1>
        <p className="px-5">$ {subTotal}</p>
      </div>
      <div className="pl-2 flex justify-around">
        <Button onClick={() => navigate('/cart')}>View Cart</Button>
        <button onClick={() => navigate('/order/new')}>Buy</button>
      </div>
    </div>
  );
}

export default CartModal;
