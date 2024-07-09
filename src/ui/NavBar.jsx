import {
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiXMark,
} from 'react-icons/hi2';
import { NavLink, useLocation } from 'react-router-dom';
import useOutsideClick from '../hooks/useOutsideClick';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
const datas = [
  { to: '/', title: 'Home', icon: <HiOutlineHome /> },
  { to: '/shop', title: 'Shop', icon: <HiOutlineShoppingBag /> },
  { to: '/about', title: 'About', icon: <HiOutlineUsers /> },
  { to: '/wishlist', title: 'Wishlist', icon: <HiOutlineHeart /> },
];

function NavBar({ isToggle, handleMenuToggle }) {
  const [activeNav, setActiveNav] = useState(datas[0].to);
  const location = useLocation();

  useEffect(
    function () {
      setActiveNav(location.pathname);
    },
    [location]
  );

  return (
    <nav className="flex items-center justify-center py-3">
      <div className="hidden md:flex items-center justify-center gap-x-4 w-fit p-1 bg-black rounded-full ">
        {datas.map((data) => (
          <NavLink to={`${data.to}`} className="" key={data.title}>
            <button
              className={`${
                activeNav === data.to
                  ? ' cursor-not-allowed'
                  : 'hover:opacity-50'
              } py-1 px-3 font-semibold  text-white rounded-full  relative `}
              onClick={() => setActiveNav(data.to)}
            >
              {activeNav === data.to && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-blue-50  "
                  style={{ borderRadius: 9999 }}
                  transition={{ type: 'spring', duration: 0.3 }}
                />
              )}
              <span className="relative z-10 mix-blend-exclusion text-[1.1rem] tracking-wide ">
                {data.title}
              </span>
            </button>
          </NavLink>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {isToggle && (
          <Navs
            handleMenuToggle={handleMenuToggle}
            datas={datas}
            activeNav={activeNav}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

function Navs({ handleMenuToggle, datas, activeNav }) {
  const ref = useOutsideClick(handleMenuToggle, true);
  return (
    <motion.nav className="w-full backdrop-blur-xl fixed inset-0 z-20  ">
      <motion.div
        className={`fixed md:hidden text-2xl w-3/4 sm:w-1/2 h-full bg-gray-50 z-50 inset-0 grid place-items-center content-between origin-top-left py-3 gap-2 `}
        ref={ref}
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <motion.div
          className="flex items-center justify-between  px-3 w-full h-full p-1 "
          variants={container}
        >
          <HiXMark />
          <h1 className="text-sm sm:text-xl flex items-center justify-center gap-3">
            <span>Welcome</span>
            <span className=" w-8 h-8  rounded-full border border-blue-300 bg-blue-700 text-white inline-flex items-center justify-center font-bold ">
              R
            </span>
          </h1>
        </motion.div>
        <motion.ul
          className="w-full h-full flex flex-col justify-center py-2 px-1 space-y-2 text-gray-50 place-self-center  "
          variants={container}
        >
          {datas.map((data, i) => (
            <motion.li
              className={`${
                activeNav === data.to
                  ? 'pointer-events-none cursor-not-allowed'
                  : 'hover:opacity-90'
              } p-2 rounded-full w-full bg-gray-800 relative `}
              key={data.title}
              onClick={handleMenuToggle}
              variants={item}
            >
              <NavLink
                to={data.to}
                className="w-full flex   items-center justify-between px-3"
              >
                {activeNav === data.to && (
                  <motion.div
                    className="absolute inset-0  bg-blue-50 border border-gray-900 "
                    style={{ borderRadius: 9999 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <motion.span className="relative text-lg mix-blend-exclusion sm:text-2xl">
                  {data.title}
                </motion.span>
                <motion.span className="realtive mix-blend-exclusion text-xl sm:text-2xl">
                  {data.icon}
                </motion.span>
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
        <hr className="w-full" />
        <motion.ul
          className=" w-full h-full py-2 px-1 text-center flex flex-col justify-end space-y-2 justify-self-end "
          variants={container}
        >
          {['Log In', 'Sign In'].map((items, i) => (
            <li
              className="bg-gray-200 text-gray-50 border border-gray-300 py-1 rounded-sm text-lg "
              key={items + i}
              variants={item}
            >
              <button className="mix-blend-exclusion">{items}</button>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.nav>
  );
}

const container = {
  hidden: {
    scale: 0,
    transition: {
      when: 'afterChildren',
      // duration: 0.2,
      // staggerChildren: 0.1,
    },
  },
  show: {
    scale: 1,
    transition: {
      // when: 'beforeChildren',
      // duration: 0.2,
      // delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
  exit: { scale: 0 },
};

export default NavBar;
