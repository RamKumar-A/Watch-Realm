import { useNavigate } from 'react-router-dom';

import { useOrder } from './useOrder';
import Button from '../../ui/Button';

function Orders() {
  const navigate = useNavigate();

  const { order } = useOrder();

  const orders = order?.data;
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-center text-3xl font-bold mb-4">Your Orders</h1>

      {orders?.length === 0 ? (
        <div className="bg-secondary-light p-6 rounded-lg shadow text-center">
          <p className="opacity-50">You have no orders yet.</p>
          <Button className="mt-2" onClick={() => navigate('/shop')}>
            Start Shopping
          </Button>
        </div>
      ) : (
        orders?.map((order) => (
          <div className=" md:px-10 " key={order?._id}>
            <div className="bg-secondary-default p-6 rounded-lg shadow grid lg:grid-cols-[1fr_2fr] gap-4 ">
              {/* Order Summary */}
              <div>
                <h2 className="font-bold ">
                  Order ID: <span className="">#{order?._id}</span>
                </h2>
                <p className="opacity-50">
                  Placed on: {new Date(order.createdAt).toDateString()}
                </p>
                <p className="opacity-50">Total: ₹{order?.totalAmount}</p>
                <p
                  className={` font-semibold ${
                    order?.paid ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  Payment: {order?.paid ? 'Success' : 'Pending'}
                </p>
                <p
                  className={` font-semibold ${
                    order?.orderStatus === 'Delivered'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  Status: {order?.status}
                </p>
              </div>

              <div className="flex items-start justify-around w-full ">
                <h3 className="font-semibold  ">
                  {order?.orderItems.length} items
                </h3>
                <Button
                  variant="secondary"
                  className="border border-accent-primary "
                  size="small"
                  onClick={() => navigate(`/my-order/${order._id}`)}
                >
                  Invoice
                </Button>
                <Button
                  variant="secondary"
                  className="border border-accent-primary "
                  size="small"
                  onClick={() => navigate(`/my-order/${order._id}`)}
                >
                  View Order
                </Button>
              </div>
              <div></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
