import { NavLink } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="bg-secondary-dark/60 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-lg md:text-3xl font-bold text-accent-primary">
            Watch Realm
          </h1>
          <p className="mt-4 text-contrastText-primary/70 text-sm">
            Discover timeless elegance with our luxurious collection of watches.
            Designed to exude sophistication and style, our timepieces are
            crafted for those who value perfection.
          </p>
        </div>

        <div className=" justify-self-center">
          <h2 className="text-lg md:text-2xl font-semibold text-accent-primary">
            Quick Links
          </h2>
          <ul className="mt-4 text-contrastText-primary/70 flex items-center gap-5 flex-wrap">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/about">About us</NavLink>
            </li>
            <li>
              <NavLink to="/my-wishlist">Wishlist</NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Watch Realm. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4 text-accent-primary">
          <NavLink>
            <FaFacebook />
          </NavLink>

          <NavLink>
            <FaXTwitter />
          </NavLink>

          <NavLink>
            <FaInstagram />
          </NavLink>

          <NavLink>
            <i className="fab fa-linkedin-in"></i>
            <FaLinkedin />
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
