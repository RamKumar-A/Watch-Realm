import { HiHeart, HiMiniStar, HiOutlineHeart } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { addItem } from '../cart/cartSlice';
import { addList, deleteList } from '../Wishlist/wishlistSlice';
import { useState } from 'react';

function WatchDetails() {
  const [wish, setWish] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { watchId } = useParams();
  const { watch: watchDetail, brands } = useLoaderData();

  const wishListData = useSelector((state) => state.wishlist.wishlist);
  const cartData = useSelector((state) => state.cart.cart);

  const details = watchDetail.find((watch) => +watchId === watch.id);
  // console.log(details);
  const brand = brands.find((brand) => brand.id === details.brand_id).name;
  const wishlist = wishListData.some((list) => list.id === details.id);
  const cart = cartData.some((cart) => cart.id === details.id);
  const price = Number(details.price_range.slice(1));

  function handleAddToCart() {
    const newItem = {
      ...details,
      quantity: 1,
      price_range: price,
      totalPrice: price * 1,
    };
    dispatch(addItem(newItem));
  }

  function handleAddToWishlist() {
    const newItem = {
      ...details,
      price_range: price,
    };
    if (wish) {
      dispatch(addList(newItem));
    } else {
      dispatch(deleteList(details.id));
    }
  }

  function handleBuy() {
    handleAddToCart();
    navigate('/order/new');
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] place-content-center my-2 mx-5 sm:mx-10 ">
      <div className="flex md:w-[50vw] items-center justify-center">
        <div className="">
          <div className="w-80 lg:w-96 h-96 flex items-center justify-center border border-gray-900 p-2">
            <img
              className="w-full h-full object-contain"
              src={details?.image_url}
              alt={details?.id}
            />
          </div>
          <div className="flex items-center justify-between py-3 text-lg lg:text-xl">
            <button
              className={`border bg-amber-500 text-gray-100 px-9 lg:px-11 py-5  `}
              onClick={handleAddToCart}
              disabled={cart}
            >
              Add To Cart
            </button>
            <button
              className="border bg-orange-600 text-gray-100 px-9 lg:px-11 py-5"
              onClick={handleBuy}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="mx-2 my-4">
        <h1 className="text-2xl py-2">{details.name}</h1>
        <div className="flex items-center gap-4">
          <h1 className="text-sm bg-green-700 w-fit px-1 py-1 rounded-md flex items-center text-gray-100 gap-1 my-2">
            {details.ratings}
            <HiMiniStar />
          </h1>
          <span
            className="text-xl"
            onClick={() => {
              setWish(!wish);
              handleAddToWishlist();
            }}
          >
            {wishlist ? (
              <HiHeart className="text-red-600" />
            ) : (
              <HiOutlineHeart />
            )}
          </span>
        </div>

        {/* price */}
        <div className="py-2">
          <h1 className="pt-2 text-lg text-green-600 font-medium">
            Special Price
          </h1>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{details.price_range}</h1>
            <h1 className="line-through">${price * 2}</h1>
            <span className="text-xs font-extrabold text-gray-400">-50%</span>
          </div>
        </div>
        {/* highlights */}
        <div className="pt-5">
          <h1 className="text-xl font-semibold">Highlights</h1>
          <table className="w-80 sm:w-96 lg:w-full  bg-gray-100 text-gray-600 border-4 border-gray-400 my-5 mx-auto lg:mx-0">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="px-3 py-4 font-semibold text-lg ">Size</td>
                <td>{details.size}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="px-3 py-4 font-semibold text-lg">Material</td>
                <td>{details.material_type}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="px-3 py-4 font-semibold text-lg">Brand</td>
                <td>{brand}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Specifications */}
        {/* <div>
          <h1>Highlights</h1>
          <table className="w-80 sm:w-96  bg-gray-100 text-gray-600 border-4 border-gray-400 my-5 mx-auto">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-5 font-semibold ">Size</td>
                <td>{details.size}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-5 font-semibold">Material</td>
                <td>{details.material_type}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-5 font-semibold">Brand</td>
                <td>{brand}</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}

export default WatchDetails;
