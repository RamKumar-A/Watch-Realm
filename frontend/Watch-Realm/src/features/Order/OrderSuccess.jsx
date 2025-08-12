import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi2';

import { createOrder } from '../../services/apiOrders';

import OrderSummary from './OrderSummary';
import Button from '../../ui/Button';
import Loader from '../../ui/Loader';

function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState(null);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        if (isOrderCreated) return;
        const orderData = await createOrder(sessionId); // Create order using session ID
        setOrder(orderData);
        setIsOrderCreated(true);
      } catch (err) {
        console.error('Error creating order:', err);
      }
    };

    if (sessionId) fetchOrderData();
  }, [sessionId, isOrderCreated]);

  return (
    <div>
      {order ? (
        <div className="grid place-content-center p-6 gap-6">
          <div className="grid place-items-center space-y-3 text-center">
            <h1>
              <HiCheckCircle size={100} className="text-green-500" />
            </h1>
            <h3 className="text-xl sm:text-3xl font-bold text-center">
              Thank you for your purchase.
            </h3>
            <p className="text-md sm:text-base">
              We've received your order will ship in 5-7 business days.
            </p>
            <p className="p-2 border border-highlight-dark rounded-lg text-md sm:text-base">
              Your Order ID:{' '}
              <span className="font-semibold text-sm sm:text-base">
                #{order.data._id}
              </span>
            </p>
            <p className="opacity-70 capitalize text-md sm:text-base">
              Delivery Address:{' '}
              <span>
                {order.data.address.line1} - {order.data.address.postal_code}
              </span>
            </p>
            {/* Display more order details */}
          </div>
          <OrderSummary order={order?.data} />
          <div className="flex items-center justify-center">
            <Link
              to={order?.data.receiptUrl}
              target="_blank"
              className="w-full"
            >
              <Button size="small" rounded="small" className="w-full">
                Download Invoice
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Button
              size="small"
              rounded="small"
              onClick={() => navigate('/my-order')}
              className="capitalize"
            >
              All Orders
            </Button>
            <Button
              size="small"
              rounded="small"
              onClick={() => navigate('/shop')}
              className="capitalize"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default OrderSuccess;
