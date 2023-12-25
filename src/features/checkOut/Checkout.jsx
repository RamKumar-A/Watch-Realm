import { useLoaderData, useNavigate } from 'react-router-dom';
import { getCheckout } from '../../services/apiWatches';
import SummaryItems from './SummaryItems';
import { HiArrowLeft } from 'react-icons/hi2';

function Checkout() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { id: cartId, cart, address, fName, lName } = data;
  const totalPrice = cart
    .filter((cart) => cart.totalPrice)
    .reduce((cur, acc) => cur + acc.totalPrice, 0);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="m-auto mt-5 text-5xl py-7 pb-10 font-bold">
          CheckOut summary
        </div>
        <p className="text-2xl font-semibold pb-5">Your Order # {cartId}</p>
        <p className="font-light">
          Hello,<span className="font-bold">{fName + ' ' + lName}</span>
        </p>
        <div className="flex flex-col justify-center items-center font-light text-xl">
          <p className="p-5">Your Purchased Item</p>
        </div>
        {cart.map((items) => (
          <SummaryItems items={items} key={items.name} />
        ))}
        <div className="p-8 text-center">
          <p className=" p-5">
            You must pay <span className="font-semibold">${totalPrice}</span>
          </p>
          <p className="">
            Your order will delivered at
            <span className=" font-semibold"> {address}</span>
          </p>
          <p className="py-5">within 2days from today </p>
        </div>
      </div>
      <button
        className="pl-10 flex items-center gap-2"
        onClick={() => navigate('/shop')}
      >
        <HiArrowLeft />
        Go to shop
      </button>
    </>
  );
}

export async function loader({ params }) {
  const order = await getCheckout(params.orderId);
  return order;
}

export default Checkout;
