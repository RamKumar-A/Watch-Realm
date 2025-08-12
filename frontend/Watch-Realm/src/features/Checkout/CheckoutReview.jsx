function CheckoutReview({ items }) {
  return (
    <div className="space-y-6 mb-2">
      {items?.length > 0 &&
        items?.map((item) => (
          <div
            className="flex gap-4 p-1 sm:p-4 md:p-6 shadow rounded-lg bg-secondary-default border border-highlight-default"
            key={item?.watch?.id}
          >
            <div className="w-20 h-20 border border-white">
              <img
                src={item?.watch.imageCover}
                className="w-full h-full object-contain p-2"
                alt={item?.watch.name}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <p className="justify-self-start font-medium text-lg">
                {item?.watch.name}
              </p>
              <p className="justify-self-start opacity-50">{item?.quantity}x</p>
              <p className="justify-self-end text-sm font-bold opacity-85">
                ₹ {item?.watch.price}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CheckoutReview;
