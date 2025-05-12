import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiChevronRight,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUsers,
} from 'react-icons/hi2';

import { useUser } from '../features/User/useUser';
import { useLogout } from '../features/User/useLogout';

import {
  childVariants,
  grandchildVariants,
  parentVariants,
} from '../helpers/variants';

import Button from './Button';

const navbarData = [
  { to: '/', title: 'Home', icon: <HiOutlineHome /> },
  { to: '/shop', title: 'Shop', icon: <HiOutlineShoppingBag /> },
  { to: '/about', title: 'About', icon: <HiOutlineUsers /> },
];

function MobileNavbar({ onClose }) {
  const [activeNav, setActiveNav] = useState(navbarData?.[0].to);
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useUser();
  const { logout } = useLogout();

  useEffect(
    function () {
      setActiveNav(location.pathname);
    },
    [location]
  );

  function handleLogout() {
    logout();
  }

  function clickAndClose(fn) {
    fn();
    onClose();
  }

  return (
    <div
      className={`h-screen grid ${
        isAuthenticated ? 'grid-rows-[auto_auto_1fr]' : 'grid-rows-[auto_1fr]'
      } px-3`}
    >
      <div className="flex items-center justify-end py-3">
        <Button
          className=" border border-highlight-default p-2"
          size="small"
          variant="text"
          onClick={onClose}
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
        >
          <HiChevronRight />
        </Button>
      </div>
      {isAuthenticated && (
        <motion.div
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
          className="w-full flex items-center justify-between gap-5 p-3 shadow-md bg-secondary-dark text-contrastText-primary my-2"
          // onClick={() => navigate('/my-account')}
        >
          <h2
            // rounded="full"
            className="text-xl w-10 h-10 bg-contrastText-secondary flex items-center justify-center rounded-full "
            variants={childVariants}
            // variant="secondary"
          >
            {user?.data?.name?.split('')?.[0]}
          </h2>
          <motion.div variants={childVariants} className="px-2 space-y-1">
            <motion.h2
              variants={grandchildVariants}
              className="text-sm line-clamp-1"
            >
              {user?.data?.name}
            </motion.h2>
            <motion.p
              className="text-xs text-contrastText-primary/70 capitalize"
              variants={grandchildVariants}
            >
              {user?.data?.role}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
      <motion.div className="w-full h-full py-3 gap-2 grid grid-rows-[1fr_auto]">
        <motion.ul
          className="w-full  justify-center space-y-2  "
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
        >
          {navbarData?.map((data) => (
            <motion.li
              className={`${
                activeNav === data.to
                  ? 'pointer-events-none cursor-not-allowed bg-accent-primary text-contrastText-secondary '
                  : 'bg-secondary-dark '
              } p-2 rounded w-full flex items-center justify-start gap-4 px-3 cursor-pointer`}
              key={data.title}
              variants={childVariants}
              onClick={() => clickAndClose(() => navigate(data.to))}
            >
              <motion.span
                className="relative border p-2 rounded-full "
                variants={grandchildVariants}
              >
                {data.icon}
              </motion.span>
              <motion.span className="relative" variants={grandchildVariants}>
                {data.title}
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          className=" w-full space-y-2 "
          variants={parentVariants}
          initial="hidden"
          whileInView="visible"
        >
          {isAuthenticated ? (
            <>
              <Button
                className=" border border-highlight-light py-1 block w-full "
                variants={childVariants}
                variant="secondary"
                onClick={() => clickAndClose(() => navigate('/my-account'))}
              >
                My Account
              </Button>
              <Button
                className=" border border-highlight-light py-1 block w-full "
                variants={childVariants}
                variant="secondary"
                onClick={() => clickAndClose(() => navigate('/my-wishlist'))}
              >
                My Wishlist
              </Button>
              <Button
                variant="danger"
                className=" border border-highlight-light py-1 block w-full "
                variants={childVariants}
                onClick={() => clickAndClose(handleLogout)}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className=" border border-highlight-light py-1 block w-full "
                variants={childVariants}
                variant="secondary"
                onClick={() => clickAndClose(() => navigate('/login'))}
              >
                Log in
              </Button>
              <Button
                variant="secondary"
                className=" border border-highlight-light py-1 block w-full "
                variants={childVariants}
                onClick={() => clickAndClose(() => navigate('/signup'))}
              >
                Sign up
              </Button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MobileNavbar;
