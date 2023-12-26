import {
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import useOutsideClick from '../hooks/useOutsideClick';

function NavBar({ isToggle, handleMenuToggle }) {
  const datas = [
    { to: '/home', title: 'Home', icon: <HiOutlineHome /> },
    { to: '/shop', title: 'Shop', icon: <HiOutlineShoppingBag /> },
    { to: '/about', title: 'AboutUs', icon: <HiOutlineUsers /> },
    { to: '/wishlist', title: 'Wishlist', icon: <HiOutlineHeart /> },
  ];

  return (
    <>
      <div className="hidden sm:block pt-5 ">
        <ul className="flex justify-evenly sm:justify-center gap-10 py-3 items-center text-gray-100 bg-gray-900 text-xl font-semibold h-20">
          {datas.map((data) => (
            <li
              className="p-2 hover:text-gray-500 px-5 border-2 py-2 border-none hover:transition-all duration-500 hover:rounded-lg"
              key={data.title}
            >
              <NavLink to={data.to} className="p-1 ">
                {data.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {isToggle && <Navs handleMenuToggle={handleMenuToggle} datas={datas} />}
    </>
  );
}

function Navs({ handleMenuToggle, datas }) {
  const ref = useOutsideClick(handleMenuToggle, true);

  return (
    <div
      className={`absolute sm:hidden py-10 text-2xl p-3 w-3/4 text-gray-100 bg-gray-900 z-50 `}
      ref={ref}
    >
      <ul className="flex flex-col justify-evenly sm:justify-center px-5 gap-8 ">
        {datas.map((data) => (
          <li
            className="p-2 hover:text-gray-400 "
            key={data.title}
            onClick={handleMenuToggle}
          >
            <NavLink
              to={data.to}
              className="flex items-center justify-start gap-2  "
            >
              {data.icon} {data.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBar;
