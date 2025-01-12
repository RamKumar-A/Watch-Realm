import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import OrderDetails from './pages/OrderDetails';

import AppLayout from './ui/AppLayout';

import ProtectedRoute from './ui/ProtectedRoute';
import Error from './ui/Error';
import OrderSuccess from './features/Order/OrderSuccess';
import Orders from './features/Order/Orders';
import ProductDetails from './features/Watchlist/ProductDetails';
import Login from './features/User/Login';
import Signup from './features/User/Signup';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '*',
        element: <Error />,
      },
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/shop',
        element: <Shop />,
        errorElement: <Error />,
      },
      {
        path: '/about',
        element: <About />,
        errorElement: <Error />,
      },
      {
        path: '/my-account',
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: '/my-wishlist',
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: '/my-cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: '/checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: '/my-order',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: '/my-order/:orderId',
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: '/order-success',
        element: (
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: '/productdetails/:slug/:pid',
        element: <ProductDetails />,
      },
      {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: '/signup',
        element: <Signup />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#74293D',
            color: '#FBFAF5',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
