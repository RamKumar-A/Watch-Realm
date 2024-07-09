import { HiTrash } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList } from './wishlistSlice';
import { addItem } from '../cart/cartSlice';
// import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

function WishlistItem({ list }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const { id, name, price_range, image_url } = list;
  const cartAdded = cart.some((item) => item.id === id);

  function handleAddToCart() {
    const newItem = {
      ...list,
      quantity: 1,
    };
    dispatch(addItem(newItem));
  }

  // function handleBuy() {
  //   if (cartAdded) handleAddToCart();
  //   navigate('/order/new');
  // }

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-around  md:px-5 rounded-md shadow-xl shadow-gray-300/30 hover:shadow-gray-300/40 py-5 gap-2 bg-gray-100 ">
      <div className="w-36 h-full m-auto  p-1 ">
        <img
          src={image_url}
          alt={id}
          className="w-full h-full object-contain  aspect-square object-center"
        />
      </div>
      <div className="space-y-1 text-center md:text-left p-3 flex-1 ">
        <h1 className="text-md font-medium ">{name}</h1>
        <p className="text-2xl font-bold">${price_range}</p>
      </div>
      <div className="flex items-center justify-center sm:gap-2 gap-2">
        {/* <Button label="Buy Now" padding="p-1.5" handler={handleBuy} /> */}
        <Button
          label="Add To Cart"
          padding="p-1.5"
          otherClasses={`text-center ${
            cartAdded && 'cursor-not-allowed pointer-events-none'
          }`}
          backgroundColor="hover:bg-orange-600"
          handler={handleAddToCart}
        />
        <Button
          label={<HiTrash size={19} className="" />}
          padding="p-1.5"
          backgroundColor="hover:bg-red-600"
          handler={() => dispatch(deleteList(id))}
        />
      </div>
    </div>
  );
}

export default WishlistItem;
