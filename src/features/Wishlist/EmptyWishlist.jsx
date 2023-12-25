import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function EmptyWishlist() {
  const navigate = useNavigate();
  return (
    <div className=" text-center pb-16 text-xl">
      <div className="text-center text-xs sm:text-xl">
        Add some Wishlist you want to buy for later
      </div>
      <div
        className="mt-5 justify-center flex items-center cursor-pointer sm:text-2xl text-gray-700 hover:text-gray-900"
        onClick={() => navigate('/shop')}
      >
        <HiArrowLeft />
        <h1>Go To Shop</h1>
      </div>
    </div>
  );
}

export default EmptyWishlist;
