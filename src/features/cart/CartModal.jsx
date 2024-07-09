import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CartItems from './CartItems';
import { getCart } from './cartSlice';
import Empty from '../../ui/Empty';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineXMark } from 'react-icons/hi2';
import useOutsideClick from '../../hooks/useOutsideClick';
const containerVariants = {
  hide: {
    scale: 0,
    transition: { duration: 0.5 },
  },
  show: {
    scale: 1,
    transition: { duration: 0.2 },
  },
};

function CartModal({ modalToggle, setModal }) {
  const cart = useSelector(getCart);
  const navigate = useNavigate();
  const subTotal = cart
    .filter((item) => item.totalPrice)
    .reduce((cur, acc) => cur + acc.totalPrice, 0);

  const ref = useOutsideClick(() => setModal(!modalToggle));

  return (
    <motion.div className=" w-full z-50 fixed h-full top-0 sm:left-1/2 xl:left-3/4 left-1/4 origin-bottom">
      <motion.div
        className="text-xl h-full relative w-3/4 sm:w-1/2 xl:w-1/4  bg-gray-100  border-gray-900 origin-bottom-right "
        ref={ref}
        variants={containerVariants}
        initial="hide"
        animate="show"
        exit="hide"
      >
        <button
          onClick={() => setModal(false)}
          className=" absolute right-3 text-xl font-bold z-50 text-gray-900 top-3 "
        >
          <HiOutlineXMark size={24} />
        </button>

        <motion.div
          variants={containerVariants}
          className="overflow-y-auto h-full grid content-between p-1 origin-bottom-right "
        >
          <div className="w-fit bg-gray-200 p-2 rounded-md  ">
            <h1 className="text-xl font-extrabold ">YOUR CART</h1>
          </div>
          <div className="overflow-y-auto ">
            <AnimatePresence mode="popLayout" initial={false}>
              {cart.length !== 0 ? (
                cart.map((items) => (
                  <CartItems classes={true} items={items} key={items.id} />
                ))
              ) : (
                <Empty>Your cart is empty</Empty>
              )}
            </AnimatePresence>
          </div>
          <div className="p-1 space-y-2">
            <div className="w-full border border-gray-300" />
            <div className="flex justify-between items-center  ">
              <h1 className="font-medium text-md"> Sub Total</h1>
              <span className="text-xl font-extrabold">
                <span className="text-xs">$</span>
                {subTotal}
              </span>
            </div>
            <div className=" w-full px-3">
              {cart.length !== 0 && (
                <motion.button
                  whileHover={{
                    backgroundColor: '#ea580c',
                    color: '#fff',
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.1 }}
                  onClick={() => navigate('/cart')}
                  className="border w-full p-2 border-gray-500 bg-gray-300 text-lg font-semibold rounded-sm "
                >
                  View Cart
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default CartModal;
