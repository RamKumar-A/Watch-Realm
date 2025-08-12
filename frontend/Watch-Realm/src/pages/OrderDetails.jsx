import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaRegAddressCard, FaTruckFast } from 'react-icons/fa6';
import { BsCalendarDate } from 'react-icons/bs';
import { IoMdPricetags } from 'react-icons/io';
import { useReactToPrint } from 'react-to-print';

import { getOrder } from '../services/apiOrders';
import Button from '../ui/Button';

function OrderDetails() {
  const params = useParams();
  const [order, setOrder] = useState({});
  const downloadRef = useRef(null);
  const reactToPrint = useReactToPrint({ contentRef: downloadRef });

  useEffect(
    function () {
      const fetchData = async () => {
        const data = await getOrder(params.orderId);
        setOrder(data?.data);
      };
      fetchData();
    },
    [params.orderId]
  );
  console.log(order);
  return (
    <section className="p-4 min-h-screen md:p-8">
      {!order ? (
        <div>Something Went Wrong</div>
      ) : (
        <div className="p-5" ref={downloadRef}>
          <div>
            <h1 className="text-3xl font-bold mb-6">Order Details</h1>
          </div>
          <div className="">
            <div className="flex justify-between items-center max-md:flex-col gap-5 max-md:items-start">
              <div>
                <h2 className="text-sm">Order Id: </h2>
                <p className="text-lg font-bold">#{params.orderId}</p>
              </div>
              <div className="flex items-center gap-2 justify-end w-full">
                <Link to={order?.receiptUrl} target="_blank">
                  <Button className="block" size="small">
                    Invoice
                  </Button>
                </Link>
                <Button className="" size="small" onClick={reactToPrint}>
                  Download
                </Button>
              </div>
            </div>
            <div className="border border-highlight-dark rounded-lg sm:m-4 my-4 p-4">
              <div className="grid md:grid-flow-col gap-6 place-items-stretch pb-6 ">
                <div className="bg-secondary-default rounded p-5 space-y-2">
                  <FaTruckFast size={24} />
                  <h3 className="text-sm">Order Status</h3>
                  <p className="font-bold text-lg">{order?.status}</p>
                </div>
                <div className="bg-secondary-default rounded p-5 space-y-2">
                  <BsCalendarDate size={24} />
                  <h4 className="text-sm">Ordered Date</h4>
                  <p className="font-bold text-lg">
                    {new Date(order?.createdAt).toDateString()}
                  </p>
                </div>
                {/* </div> */}
                {/* <div className="flex items-center justify-between"> */}
                <div className="bg-secondary-default rounded p-5 space-y-2">
                  <IoMdPricetags size={24} />
                  <h4 className="text-sm">Price</h4>
                  <p className="font-bold text-lg">₹ {order?.totalAmount}</p>
                </div>
                <div className="bg-secondary-default rounded p-5 space-y-2">
                  <FaRegAddressCard size={24} />
                  <h4 className="text-sm">Delivery Address</h4>
                  <p className="font-bold text-lg">{order?.address?.city}</p>
                </div>
              </div>
              <div className="space-y-5">
                {/* <h4 className="my-5">
                  Order Id :{' '}
                  <span className="font-semibold">#{params.orderId}</span>
                </h4> */}
                <h4 className="text-lg font-bold">Ordered Items</h4>
                <div className="bg-secondary-light/25 p-2 sm:p-4 rounded-lg shadow flex items-center justify-between gap-4 max-md:flex-wrap">
                  {order?.orderItems?.map((o) => {
                    const { _id, name, imageCover, price } = o.watch ?? {};
                    return (
                      <div
                        className="w-full flex items-center justify-start bg-secondary-default p-2 md:p-5 rounded"
                        key={_id}
                      >
                        <div className="w-20 h-20 mx-1">
                          <img
                            src={imageCover}
                            alt={name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="">
                          <h5 className="font-bold line-clamp-2">{name}</h5>
                          <p className="text-black/40 max-md:text-sm font-semibold">
                            ₹{price}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrderDetails;
