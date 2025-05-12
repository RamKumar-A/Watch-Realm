import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUsers,
} from 'react-icons/hi2';

export const navbarData = () => {
  return [
    { to: '/', title: 'Home', icon: <HiOutlineHome /> },
    { to: '/shop', title: 'Shop', icon: <HiOutlineShoppingBag /> },
    { to: '/about', title: 'About', icon: <HiOutlineUsers /> },
  ];
};
