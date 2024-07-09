import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { HiXMark } from 'react-icons/hi2';
import { HiMenuAlt2, HiSearch, HiShoppingCart } from 'react-icons/hi';
import CartModal from '../features/cart/CartModal';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../features/cart/cartSlice';
import Logo from './Logo';
import useOutsideClick from '../hooks/useOutsideClick';
import { motion, AnimatePresence } from 'framer-motion';
import { searchWatch } from '../features/watchList/filterSlice';

function Header({ isToggle, setIsToggle, handleMenuToggle }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cartModalToggle, setCartModalToggle] = useState(false);
  const dispatch = useDispatch();
  const ref = useOutsideClick(() => setIsSearchOpen(false));
  const cartlength = useSelector(getCart);

  useEffect(
    function () {
      dispatch(searchWatch(query));
    },
    [query, dispatch]
  );

  return (
    <header className="grid grid-cols-3 items-center w-full py-3 px-1 sm:px-6 bg-gray-50 z-10 relative">
      <div className="flex items-center  text-2xl">
        <div onClick={handleMenuToggle} className="pr-3">
          <HiMenuAlt2 className=" md:hidden " />
        </div>
        <Logo />
      </div>
      <NavBar isToggle={isToggle} handleMenuToggle={handleMenuToggle} />
      <div className="flex items-center w-fit justify-end justify-self-end gap-3">
        <AnimatePresence mode="wait" initial={false}>
          {isSearchOpen && (
            <motion.form
              className="w-full inset-0 backdrop-blur-md absolute rounded-md h-full flex items-center justify-center gap-1 sm:gap-5 z-50  sm:bg-gray-50 origin-right"
              ref={ref}
              initial={{ opactiy: 0, scale: 0 }}
              animate={{ opactiy: 1, scale: 1 }}
              exit={{ opactiy: 0, scale: 0 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="search"
                className="border border-gray-900  rounded-lg basis-3/4 items-center p-3 relative"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="font-bold  bg-gray-900 rounded-full "
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <HiXMark size={24} className="p-0.5 text-gray-300 " />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        <div className="mt-1.5 flex text-2xl justify-around items-center gap-3">
          <h2 className="cursor-pointer">
            <HiSearch
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              size={26}
              className="text-lg sm:text-2xl"
            />
          </h2>

          <h2
            className="relative cursor-pointer "
            onClick={() => setCartModalToggle(!cartModalToggle)}
          >
            <HiShoppingCart size={26} className="" />
            <span className="text-[0.35rem] absolute text-gray-100 z-10  w-3 h-3 bg-red-600 flex items-center justify-center rounded-full top-0 right-0 ">
              {cartlength.length}
            </span>
          </h2>
          <AnimatePresence mode="wait" initial={false}>
            {cartModalToggle && (
              <CartModal
                modalToggle={cartModalToggle}
                setModal={setCartModalToggle}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default Header;
