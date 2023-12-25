import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import AppLayout from './ui/AppLayout';
import Shopping from './features/watchList/Shopping';
import Aboutus from './ui/Aboutus';
import { loader as watchLoader } from './features/watchList/Shopping';
import Error from './ui/Error';
import Cart from './features/cart/Cart';
import Wishlist from './features/Wishlist/Wishlist';
import CreateNewCheckout, {
  formDataAction,
} from './features/checkOut/CreateNewCheckout';
import Checkout, { loader } from './features/checkOut/checkout';
import WatchDetails from './features/watchList/WatchDetails';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    loader: watchLoader,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/home',
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/shop',
        element: <Shopping />,
        loader: watchLoader,
        errorElement: <Error />,
      },
      {
        path: '/about',
        element: <Aboutus />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/wishlist',
        element: <Wishlist />,
      },
      {
        path: '/watchdetails/:watchId',
        element: <WatchDetails />,
        loader: watchLoader,
      },
      {
        path: '/order/new',
        element: <CreateNewCheckout />,
        errorElement: <Error />,
        action: formDataAction,
      },
      {
        path: '/order/:orderId',
        element: <Checkout />,
        loader: loader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
