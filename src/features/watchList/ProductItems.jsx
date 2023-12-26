import { useDispatch, useSelector } from 'react-redux';
import { HiPlus } from 'react-icons/hi2';
import {
  IoBookmark,
  IoBookmarkOutline,
  IoCartOutline,
  IoCartSharp,
} from 'react-icons/io5';

// <IoCartSharp />
import { deleteList } from '../Wishlist/wishlistSlice';
import { addItem } from '../cart/cartSlice';
import { addList } from '../Wishlist/wishlistSlice';
import { useNavigate } from 'react-router-dom';

function ProductItems({ watch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, name, price_range, ratings, image_url } = watch;

  const cartData = useSelector((state) => state.cart.cart);
  const wishListData = useSelector((state) => state.wishlist.wishlist);

  const cart = cartData.map((cart) => cart.id) || [];
  const wishlist = wishListData.map((list) => list.id) || [];

  const price = Number(price_range.slice(1));

  function handleAddToCart() {
    const newItem = {
      ...watch,
      quantity: 1,
      price_range: price,
      totalPrice: price * 1,
    };
    dispatch(addItem(newItem));
  }

  function handleAddToWishlist() {
    const newItem = {
      ...watch,
      price_range: price,
    };
    dispatch(addList(newItem));
  }

  function handleDeleteList() {
    dispatch(deleteList(id));
  }

  function handleBuy() {
    const cart = cartData.some((cart) => cart.id === id);
    if (!cart) handleAddToCart();
    navigate('/order/new');
  }

  function handleDetails() {
    navigate(`/watchdetails/${id}`);
  }

  return (
    <main
      className={`w-[300px] h-[550px] p-1 mb-8 mx-8 border-0 border-b-[3px] border-gray-600 
        shadow-xl hover:shadow-gray-900 
       `}
    >
      <div className="h-[350px] pt-0.5">
        <img
          className="w-full h-[250px] object-contain rounded-xl"
          src={image_url}
          alt={id}
          onClick={handleDetails}
        />
        <div className=" w-full mt-16 grid grid-rows-3">
          <h1
            className="text-center text-2xl font-bold "
            onClick={handleDetails}
          >
            {name}
          </h1>
          <div className="flex justify-between py-5 text-xl ">
            <div>
              ⭐⭐⭐⭐{' '}
              <span className="text-xs font-bold text-amber-500">
                {ratings}
              </span>
            </div>
            <div className="font-semibold">
              ${price}
              <span className="text-xs line-through font-normal">$45.35</span>
            </div>
          </div>
          <div className={` grid grid-cols-[auto_1fr_auto] px-2 pt-5 `}>
            <button
              className="border p-2 border-gray-500 "
              onClick={handleAddToCart}
              disabled={cart.includes(id)}
            >
              {cart.includes(id) ? (
                <IoCartSharp className="text-2xl " />
              ) : (
                <span className="flex items-center">
                  <HiPlus className=" font-bold" />
                  <IoCartOutline className="text-2xl" />
                </span>
              )}
            </button>

            <button className="" onClick={handleBuy}>
              Buy Now
            </button>
            <button
              className="p-2 border border-gray-500 text-2xl "
              onClick={
                wishlist.includes(id) ? handleDeleteList : handleAddToWishlist
              }
            >
              {wishlist.includes(id) ? (
                <IoBookmark />
              ) : (
                <span className="flex items-center">
                  <HiPlus className="text-sm font-bold" />
                  <IoBookmarkOutline className="text-gray-700 " />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductItems;
