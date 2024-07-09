import { AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
// import Home from './Home';
// import Error from './Error';
// import Shopping from '../features/watchList/Shopping';
// import Aboutus from './Aboutus';
// import Wishlist from '../features/Wishlist/Wishlist';
// import Cart from '../features/cart/Cart';
// import WatchDetails from '../features/watchList/WatchDetails';
// import CreateNewCheckout, {
//   formDataAction,
// } from '../features/checkOut/CreateNewCheckout';
// import Checkout, { loader } from '../features/checkOut/Checkout';
// import { loader as watchLoader } from '../features/watchList/Shopping';

function AnimatedOulet() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Outlet key={location.key} />
    </AnimatePresence>
  );
}

export default AnimatedOulet;
