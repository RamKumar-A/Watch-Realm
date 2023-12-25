import styled from 'styled-components';
import CartItems from './CartItems';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import { HiArrowLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import EmptyCart from './EmptyCart';

const StyledDiv = styled.div`
  /* margin: 1rem 15rem; */
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const CartList = styled.div`
  padding: 1.5rem;
  margin: 1rem;
`;

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(getCart);

  return (
    <StyledDiv>
      <p
        className="mx-14 pt-5 flex items-center gap-2 cursor-pointer w-fit"
        onClick={() => navigate('/shop')}
      >
        <HiArrowLeft />
        Back to Shop
      </p>
      <div>
        <div className="grid sm:grid-cols-5 place-items-center place-content-center  m-10 ">
          {cart.length !== 0 ? (
            <H1 className="col-span-3">Products</H1>
          ) : (
            <div className="col-span-5">
              <EmptyCart />
            </div>
          )}
          <H1 className="hidden sm:grid">Quantity</H1>
          <H1 className="hidden sm:grid">Total</H1>
        </div>
        <CartList className="">
          {cart.map((items) => (
            <CartItems items={items} key={items.name} />
          ))}
        </CartList>
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
    </StyledDiv>
  );
}

export default Cart;
