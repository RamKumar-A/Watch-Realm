function OrderSummary({ order }) {
  return (
    <div className="bg-secondary-default p-6 rounded-md shadow max-w-screen-sm">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2 pb-2">
        <OrderItems order={order} />
      </div>
      <hr className="text-highlight-dark mb-4" />
      <div className="flex justify-between mb-4 text-sm sm:text-base">
        <p className="">Shipping</p>
        <p>
          <span>Free </span>
          <span className="text-xs line-through opacity-50">₹50</span>
        </p>
      </div>
      <hr className="text-highlight-dark mb-4" />
      <div className="flex justify-between text-md sm:text-lg font-bold">
        <p>Total</p>
        <p>₹ {order?.totalAmount}</p>
      </div>
    </div>
  );
}

function OrderItems({ order }) {
  return (
    <div>
      <ul className="space-y-3">
        {order?.orderItems?.map((item) => (
          <li key={item._id} className="w-full flex items-center gap-4  pb-3">
            <img
              src={item.watch.imageCover}
              alt={item.watch.name}
              className="w-16 h-16 rounded object-cover"
            />
            <div>
              <p className="text-gray-800 font-medium">{item.watch.name}</p>
              <p className="text-gray-600">
                {item.quantity} × ₹{item.watch.price}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderSummary;
