import { useNavigate } from 'react-router-dom';

import { useWishlist } from '../features/Wishlist/useWishlist';
import WishlistItem from '../features/Wishlist/WishlistItem';

import Button from '../ui/Button';

function Wishlist() {
  const navigate = useNavigate();

  const { wishlist } = useWishlist();

  const wishlistItems = wishlist?.data?.items;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {!wishlistItems || wishlistItems?.length === 0 ? (
        <div className="bg-secondary-light p-6 rounded-lg shadow text-center space-y-4">
          <p className="opacity-75">Your wishlish is empty.</p>
          <Button onClick={() => navigate('/shop')} className="">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6 ">
          {wishlist?.data?.items.map((watch) => {
            return <WishlistItem watch={watch} key={watch._id} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
