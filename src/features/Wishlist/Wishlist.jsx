import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import WishlistItem from './WishlistItem';
import { clearList } from './wishlistSlice';
import EmptyWishlist from './EmptyWishlist';

const H1 = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
`;

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  return (
    <>
      <div className="m-10 sm:m-20 sm:grid sm:grid-cols-2 place-items-center lg:block ">
        <div className="hidden lg:grid grid-cols-5 place-items-center mb-20">
          <H1>Image</H1>
          <H1>Product</H1>
          <H1>Price</H1>
          <H1>Purchase</H1>
          <H1>Remove</H1>
        </div>
        {wishlist.map((list) => (
          <WishlistItem list={list} key={list.id} />
        ))}
      </div>
      {wishlist.length !== 0 ? (
        <div
          className="mx-16 cursor-pointer text-xl"
          onClick={() => dispatch(clearList())}
        >
          Remove All
        </div>
      ) : (
        <EmptyWishlist />
      )}
    </>
  );
}

export default Wishlist;
