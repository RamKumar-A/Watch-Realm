import {
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';
const Li = styled.li`
  padding: 0.5rem;

  &:hover {
    color: #9ca3af;
  }
`;

function NavBar({ isToggle, handleMenuToggle }) {
  const datas = [
    { to: '/home', title: 'Home', icon: <HiOutlineHome /> },
    { to: '/shop', title: 'Shop', icon: <HiOutlineShoppingBag /> },
    { to: '/about', title: 'AboutUs', icon: <HiOutlineUsers /> },
    { to: '/wishlist', title: 'Wishlist', icon: <HiOutlineHeart /> },
  ];

  return (
    <>
      <div className="hidden sm:block pt-5 pb-2">
        <ul className="flex justify-evenly sm:justify-evenly py-3 items-center text-gray-100 bg-gray-900 text-xl font-semibold h-20">
          {datas.map((data) => (
            <Li key={data.title}>
              <NavLink to={data.to} className="p-2">
                {data.title}
              </NavLink>
            </Li>
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
          <Li
            className="border-b-[1px] border-gray-400 "
            key={data.title}
            onClick={handleMenuToggle}
          >
            <NavLink
              to={data.to}
              className="flex items-center justify-start gap-2  "
            >
              {data.icon} {data.title}
            </NavLink>
          </Li>
        ))}
      </ul>
    </div>
  );
}

export default NavBar;
