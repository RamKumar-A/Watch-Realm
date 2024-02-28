import { useDispatch, useSelector } from 'react-redux';
import WishlistItem from './WishlistItem';
import { clearList } from './wishlistSlice';
import Empty from '../../ui/Empty';
import BacktoShop from '../../ui/BacktoShop';

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  return (
    <>
      <BacktoShop />
      <div className="m-10 sm:m-20 grid sm:grid-cols-2 place-items-center lg:block ">
        <div
          className={`hidden lg:grid grid-cols-5 place-items-center mb-20 ${
            wishlist.length === 0 && 'lg:hidden'
          }`}
        >
          <h1 className="text-[1.3rem] font-bold">Image</h1>
          <h1 className="text-[1.3rem] font-bold">Product</h1>
          <h1 className="text-[1.3rem] font-bold">Price</h1>
          <h1 className="text-[1.3rem] font-bold">Purchase</h1>
          <h1 className="text-[1.3rem] font-bold">Remove</h1>
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
        <Empty>Nothing found in your wishlist</Empty>
      )}
    </>
  );
}

export default Wishlist;
