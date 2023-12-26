import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { HiXMark } from 'react-icons/hi2';
import { HiMenuAlt2, HiSearch, HiShoppingCart } from 'react-icons/hi';
import Modal from './Modal';
import CartModal from '../features/cart/CartModal';
import { useFilter } from '../features/watchList/Context';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCart } from '../features/cart/cartSlice';

function Header() {
  const [isToggle, setIsToggle] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { dispatch } = useFilter();

  const cartlength = useSelector(getCart);

  function handleMenuToggle() {
    setIsToggle((toggle) => !toggle);
  }

  useEffect(
    function () {
      dispatch({ type: 'searchWatch', payload: query });
    },
    [query, dispatch]
  );

  return (
    <header>
      <div className="flex relative px-4 justify-between h-20 lg:mx-10  bg-gray-200 sm:bg-gray-50">
        <div className="mr-1 flex items-center w-[60%] text-2xl">
          <div onClick={handleMenuToggle} className="">
            {isToggle ? (
              <div>
                <HiXMark className=" sm:hidden mr-3 " />
              </div>
            ) : (
              <HiMenuAlt2 className=" sm:hidden mr-3 " />
            )}
          </div>
          <Link to="/home">
            <h2 className="sm:text-5xl text-gray-800 text-[1.8rem] sm:mr-5 logo ">
              Watch
              <span className="text-gray-400 pl-2">Realm</span>
            </h2>
          </Link>
        </div>
        <div className="flex items-center w-[50%] justify-end gap-3">
          {isSearchOpen && (
            <form
              className="w-[95%] sm:w-[98%] lg:w-full absolute left-2 top-3  rounded-lg  sm:h-16 flex   items-center justify-center gap-1 sm:gap-5 z-50 bg-gray-200 sm:bg-gray-50"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="search"
                className="border border-gray-900 sm:block sm:h-16 rounded-lg sm:basis-3/4 items-center p-3 w-[100%] relative"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="font-bold  bg-gray-900 rounded-full "
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <HiXMark className="text-gray-300 text-2xl cursor-pointer" />
              </button>
            </form>
          )}
          <div className="mt-1.5 flex text-2xl justify-around items-center gap-3">
            <h2 className="cursor-pointer">
              <HiSearch
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-lg sm:text-2xl"
              />
            </h2>
            {/* <h2>
              <HiUser className="rounded-full sm:[w-6 h-6] text-lg sm:text-2xl cursor-pointer" />
            </h2> */}
            <Modal>
              <Modal.Trigger opens="cart-modal">
                <h2>
                  <HiShoppingCart className="rounded-full text-lg sm:text-2xl sm:[w-6 h-6] cursor-pointer relative" />
                  <div className="text-xs h-1 absolute bg-gray-200 rounded-full z-30 top-7 right-3 flex items-center justify-center">
                    {cartlength.length}
                  </div>
                </h2>
              </Modal.Trigger>
              <Modal.Content name="cart-modal">
                <CartModal />
              </Modal.Content>
            </Modal>
          </div>
        </div>
      </div>
      <NavBar isToggle={isToggle} handleMenuToggle={handleMenuToggle} />
    </header>
  );
}

export default Header;
