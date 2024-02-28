import { HiTrash } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList } from './wishlistSlice';
import { addItem } from '../cart/cartSlice';
import { useNavigate } from 'react-router-dom';

function WishlistItem({ list }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  function handleBuy() {
    if (cartAdded) handleAddToCart();
    navigate('/order/new');
  }

  return (
    <div className=" lg:grid grid-cols-5 place-items-center m-5 shadow-lg shadow-gray-900">
      <div className="w-[250px] object-cover m-auto my-1 md:h-[350px] lg:w-[150px] lg:h-[250px]">
        <img
          src={image_url}
          alt={id}
          className="object-contain w-[250px] md:h-[250px] lg:h-[250px]"
        />
      </div>
      <h1 className="text-[1.3rem] text-center font-bold p-2">{name}</h1>
      <p className="text-center p-2">${price_range}</p>
      <div className="flex  justify-around  sm:gap-7 gap-2">
        <button className="text-center" onClick={handleBuy}>
          Buy Now
        </button>
        <button
          className={`text-center ${cartAdded && 'pointer-events-none'}`}
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
      <div className="m-auto text-center p-4">
        <button
          className="text-center py-2 px-5 "
          onClick={() => dispatch(deleteList(id))}
        >
          <h1 className="text-2xl ">
            <HiTrash />
          </h1>
        </button>
      </div>
    </div>
  );
}

export default WishlistItem;
