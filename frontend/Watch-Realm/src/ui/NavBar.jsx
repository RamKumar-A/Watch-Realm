import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navbarData = [
  { to: '/', title: 'Home' },
  { to: '/shop', title: 'Shop' },
  { to: '/about', title: 'About' },
];

function NavBar() {
  const [activeNav, setActiveNav] = useState(navbarData?.[0].to);
  const location = useLocation();

  useEffect(
    function () {
      setActiveNav(location.pathname);
    },
    [location]
  );

  return (
    <nav className="flex items-center justify-center py-3">
      <div className="hidden md:flex items-center justify-center gap-x-4 w-fit p-1 rounded-full bg-secondary-light border border-highlight-dark">
        {navbarData?.map((data) => (
          <NavLink to={`${data.to}`} className="" key={data.title}>
            <button
              className={`${
                activeNav === data.to
                  ? ' cursor-not-allowed'
                  : 'hover:brightness-0'
              } py-1 px-3 font-semibold rounded-full relative `}
              onClick={() => setActiveNav(data.to)}
            >
              {activeNav === data.to && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0  bg-accent-primary"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: 'spring', duration: 0.3 }}
                />
              )}
              <span
                className={`relative z-10   tracking-wide ${
                  activeNav === data.to
                    ? 'text-contrastText-secondary'
                    : 'text-contrastText-primary'
                } `}
              >
                {data.title}
              </span>
            </button>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
