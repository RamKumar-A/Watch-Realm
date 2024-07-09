import { useDispatch, useSelector } from 'react-redux';
import WishlistItem from './WishlistItem';
import { clearList } from './wishlistSlice';
import Empty from '../../ui/Empty';
import PageWrapper from '../../PageWrapper';
import Button from '../../ui/Button';
import { HiArrowLeft } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  return (
    <PageWrapper>
      <div className="w-full h-full gap-2 py-3  ">
        <h1 className="hidden lg:block text-2xl font-extrabold text-center p-3 tracking-wide ">
          My Wishlist <span className="text-sm">({wishlist?.length})</span>
        </h1>
        <div className="flex flex-wrap px-5 lg:px-20 gap-5 ">
          {wishlist.length > 0 ? (
            wishlist.map((list) => <WishlistItem list={list} key={list.id} />)
          ) : (
            <Empty>Nothing found in your wishlist</Empty>
          )}
        </div>
        {wishlist.length !== 0 && (
          <div className="w-full flex items-center justify-center py-5">
            <Button
              label="Remove All"
              padding="p-1.5"
              backgroundColor="bg-red-600 text-gray-50 hover:bg-red-700"
              handler={() => dispatch(clearList())}
            />
          </div>
        )}
      </div>
      <div className=" w-full pb-3 flex justify-center ">
        <NavLink to="/shop">
          <Button
            label="Back to shop"
            icon={<HiArrowLeft />}
            padding="p-1.5"
            backgroundColor="hover:bg-gray-400"
          />
        </NavLink>
      </div>
    </PageWrapper>
  );
}

export default Wishlist;
