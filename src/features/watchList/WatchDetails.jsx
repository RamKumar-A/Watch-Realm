import { HiHeart, HiMiniStar, HiOutlineHeart } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useParams } from 'react-router-dom';
import { addItem } from '../cart/cartSlice';
import { addList, deleteList } from '../Wishlist/wishlistSlice';
import { useState } from 'react';
import PageWrapper from '../../PageWrapper';
import Button from '../../ui/Button';

function WatchDetails() {
  const [wish, setWish] = useState(false);
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

  return (
    <PageWrapper>
      <div className="grid md:grid-cols-[40%_60%] content-between h-fit p-2">
        <div className="p-2 md:sticky top-1">
          <div className="w-full h-72 p-2 border border-gray-300 rounded min-[500px]:h-80 ">
            <img
              className="w-80 mx-auto h-full object-contain aspect-square"
              src={details?.image_url}
              alt={details?.id}
            />
          </div>
          <div className="w-full py-2 ">
            <button
              className={`w-full rounded p-2 bg-orange-600 text-gray-100  `}
              onClick={handleAddToCart}
              disabled={cart}
            >
              Add To Cart
            </button>
          </div>
        </div>
        <div className="p-2 ">
          <h1 className="text-2xl font-bold tracking-wide ">{details.name}</h1>
          <div className="flex items-center gap-2">
            <h1 className="text-sm bg-green-700 rounded flex justify-center gap-1 items-center text-gray-100 py-0.5 px-1">
              <span>{details.ratings}</span>
              <HiMiniStar size={12} />
            </h1>
            <Button
              handler={() => {
                setWish(!wish);
                handleAddToWishlist();
              }}
              padding="p-1"
              backgroundColor="hover:bg-gray-300"
              label={
                wishlist ? (
                  <HiHeart className="text-red-600" />
                ) : (
                  <HiOutlineHeart className="text-gray-900" />
                )
              }
            />
          </div>

          {/* price */}
          <div className="py-2">
            <h1 className=" text-lg text-green-600 py-1 font-medium">
              Special Price
            </h1>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{details.price_range}</h1>
              <h1 className="space-x-1">
                <span className="text-xs">$</span>
                <span className="line-through">{price * 2}</span>
                <span className="text-xs font-extrabold no-underline text-gray-400">
                  -50%
                </span>
              </h1>
            </div>
          </div>
          {/* highlights */}
          <div className="">
            <h1 className="text-xl font-semibold py-2">Highlights</h1>
            <div className="overflow-x-auto py-3">
              <table className="border-separate border-spacing-1 w-full border border-slate-500  ">
                <tbody className="">
                  <tr className="">
                    <td className="border border-slate-700  ">Size</td>
                    <td className="border border-slate-700  ">
                      {details.size}
                    </td>
                  </tr>
                  <tr>
                    <td className=" border border-slate-700">Material</td>
                    <td className="border border-slate-700">
                      {details.material_type}
                    </td>
                  </tr>
                  <tr>
                    <td className=" border border-slate-700">Brand</td>
                    <td className="border border-slate-700">{brand}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Description */}
          <div className="py-2">
            <h1 className="text-xl py-2 font-semibold ">Description</h1>
            <p className="text-md font-roboto text-left tracking-wide px-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex iusto
              porro nostrum minus temporibus a saepe quibusdam illo consectetur
              quia accusantium, repellat minima exercitationem numquam, eligendi
              inventore necessitatibus ad atque incidunt facere molestiae qui!
              Unde aperiam cumque aut expedita soluta illum illo voluptatum quis
              ea reprehenderit! Placeat nemo nobis temporibus.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default WatchDetails;
