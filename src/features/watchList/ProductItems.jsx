import { useDispatch, useSelector } from 'react-redux';
import { HiHeart, HiMiniStar, HiOutlineHeart } from 'react-icons/hi2';
import { IoCartOutline, IoCartSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { deleteList } from '../Wishlist/wishlistSlice';
import { addItem } from '../cart/cartSlice';
import { addList } from '../Wishlist/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import Modal from '../../ui/Modal';
import CartModal from '../cart/CartModal';

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

  function handleDetails() {
    navigate(`/watchdetails/${id}`);
  }

  return (
    <motion.main
      className="w-80 bg-gray-100 border-gray-300 cursor-pointer p-2 border shadow-sm shadow-gray-400"
      whileHover={{
        boxShadow: '0 10px 15px -3px #686868, 0 4px 6px -4px #ffffff',
        backgroundColor: '#e5e7eb',
      }}
    >
      <div className="">
        <div className="w-full h-80 border relative border-gray-200 backdrop-brightness-150 ">
          <img
            className="w-full h-full aspect-square object-contain p-3 "
            src={image_url}
            alt={id}
            onClick={handleDetails}
          />
          <button
            className="p-2 border-2 rounded-full bg-gray-50 absolute top-2 right-2 border-gray-500 text-2xl "
            onClick={
              wishlist.includes(id) ? handleDeleteList : handleAddToWishlist
            }
          >
            {wishlist.includes(id) ? (
              <HiHeart className="text-red-600" />
            ) : (
              <span className="flex items-center">
                <HiOutlineHeart className="text-gray-700 " />
              </span>
            )}
          </button>
        </div>
        <div className="">
          <h1
            className="w-full h-20 flex items-center text-center justify-center text-lg font-bold "
            onClick={handleDetails}
          >
            {name}
          </h1>
          <div className="flex items-center justify-between text-xl px-2 py-3 ">
            <span className="flex items-center text-xs font-bold bg-green-600 text-gray-100 py-1 px-2 rounded-xl ">
              <HiMiniStar size={10} />
              {ratings}
            </span>
            <div className="flex items-center gap-1 ">
              <span className="font-bold text-2xl">${price}</span>
              <span className="text-xs line-through font-normal">
                $45000.35
              </span>
            </div>
          </div>
          <Modal>
            <motion.button
              className="border w-full flex items-center p-2 border-gray-500 justify-center gap-2 bg-gray-300 "
              onClick={handleAddToCart}
              disabled={cart.includes(id)}
              whileHover={{ backgroundColor: '#eb551a', color: '#fff' }}
              transition={{ type: 'spring', duration: 0.8 }}
            >
              <Modal.Trigger opens="cart">
                <>
                  {cart.includes(id) ? (
                    <IoCartSharp size={26} />
                  ) : (
                    <span className="flex items-center">
                      <IoCartOutline size={26} />
                    </span>
                  )}
                  <span>Add to cart</span>
                </>
              </Modal.Trigger>
            </motion.button>
            <Modal.Content name="cart">
              <CartModal />
            </Modal.Content>

            {/* <button
                className="p-2 border border-gray-500 text-2xl "
                onClick={
                  wishlist.includes(id) ? handleDeleteList : handleAddToWishlist
                }
              >
                {wishlist.includes(id) ? (
                  <HiHeart className="text-red-600" />
                ) : (
                  <span className="flex items-center">
                    <HiOutlineHeart className="text-gray-700 " />
                  </span>
                )}
              </button> */}
            {/* </div> */}
          </Modal>
        </div>
      </div>
    </motion.main>
  );
}

export default ProductItems;
