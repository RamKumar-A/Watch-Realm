import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HiMenuAlt2 } from 'react-icons/hi';
import { HiOutlineShoppingCart, HiOutlineUserCircle } from 'react-icons/hi2';

import { useUser } from '../features/User/useUser';
import { useCart } from '../features/Cart/useCart';
import { useLogout } from '../features/User/useLogout';
import CartModal from '../features/Cart/CartModal';

import Logo from './Logo';
import Drawer from './Drawer';
import MobileNavbar from './MobileNavbar';
import Menu from './Menu';
import MenuItem from './MenuItem';
import NavBar from './NavBar';
import Search from './Search';
import Dialog from './Dialog';
import Button from './Button';

function Header() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const anchorRef = useRef(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { cart } = useCart();
  const { user, isAuthenticated } = useUser();
  const { logout } = useLogout();

  const userPhoto = user?.data?.photo;
  const cartItems = cart?.data?.items;

  function handleLogout() {
    logout();
  }

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  return (
    <header className="grid grid-cols-3 items-center w-full px-1 sm:px-6 py-2 z-10 relative ">
      <div className="flex items-center text-2xl">
        <div
          className="pr-3 md:hidden cursor-pointer"
          onClick={() => setIsNavOpen(true)}
        >
          <HiMenuAlt2 />
        </div>
        <Logo />
      </div>
      <NavBar />
      <div className="flex items-center w-fit justify-end justify-self-end gap-3">
        {/* <div className="flex justify-around items-center gap-3 "> */}
        <div className="relative">
          <div
            ref={anchorRef}
            onClick={toggleMenu}
            className="w-8 h-8 hidden md:block cursor-pointer"
          >
            {isAuthenticated && userPhoto ? (
              <div className="w-8 h-8 rounded-full">
                <img
                  src={userPhoto}
                  className="w-full h-full rounded-full object-cover"
                  alt={user?.data?.id}
                />
              </div>
            ) : (
              <HiOutlineUserCircle className="w-full h-full" />
            )}
          </div>
          <Menu
            isOpen={isMenuOpen}
            anchorRef={anchorRef}
            onClose={() => setIsMenuOpen(false)}
          >
            {isAuthenticated ? (
              <>
                <MenuItem
                  onClick={() => {
                    navigate('/my-account');
                    setIsMenuOpen(false);
                  }}
                >
                  My Account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/my-wishlist');
                    setIsMenuOpen(false);
                  }}
                >
                  My Wishlist
                </MenuItem>
                <MenuItem onClick={() => setIsLogoutDialogOpen(true)}>
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  className=""
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/signup');
                    setIsMenuOpen(false);
                  }}
                >
                  Signup
                </MenuItem>
              </>
            )}
          </Menu>
        </div>

        <Search />

        <h2
          className="relative cursor-pointer "
          onClick={() => setIsCartOpen(true)}
        >
          <HiOutlineShoppingCart size={24} className="" />
          <span className="text-[0.35rem] absolute z-10 w-3 h-3 bg-accent-primary text-accent-secondary flex items-center justify-center rounded-full top-0 right-0 ">
            {cartItems?.length || 0}
          </span>
        </h2>

        <AnimatePresence mode="wait" initial={false}>
          <Drawer
            isOpen={isCartOpen}
            position="right"
            onClose={() => setIsCartOpen(false)}
            classes="border-l border-highlight-dark"
          >
            <CartModal onClose={() => setIsCartOpen(false)} />
          </Drawer>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <Drawer
            isOpen={isNavOpen}
            position="left"
            onClose={() => setIsNavOpen(false)}
          >
            <MobileNavbar onClose={() => setIsNavOpen(false)} />
          </Drawer>
        </AnimatePresence>
        {/* </div> */}

        <Dialog
          title="Logout"
          open={isLogoutDialogOpen}
          onClose={() => setIsLogoutDialogOpen(false)}
        >
          <div className="space-y-5">
            <p className="text-md md:text-base">Are you sure want to logout?</p>
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="secondary"
                onClick={() => setIsLogoutDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleLogout();
                  setIsLogoutDialogOpen(false);
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </header>
  );
}

export default Header;
