import { useLoaderData } from 'react-router-dom';
import { getCheckout } from '../../services/apiWatches';
import SummaryItems from './SummaryItems';
import PageWrapper from '../../PageWrapper';
import Button from '../../ui/Button';
import { HiArrowLeft } from 'react-icons/hi2';
function Checkout() {
  const { id: cartId, cart, address, name } = useLoaderData();
  const carts = useLoaderData();
  // console.log(carts);
  const totalPrice = cart
    .filter((cart) => cart.totalPrice)
    .reduce((cur, acc) => cur + acc.totalPrice, 0);
  return (
    <PageWrapper>
      <div className="p-3">
        <h1 className="text-2xl tracking-wide p-3 text-center font-extrabold">
          Checkout Details
        </h1>
        <div className="text-center leading-10">
          <h2 className="tracking-wider font-bold">Your Order # {cartId}</h2>
          <h3 className="">
            Hello,
            <span className="tracking-wide capitalize"> {name}</span>
          </h3>
          <h2 className="text-md">Your Purchased Items</h2>
        </div>
        <div className="flex flex-wrap gap-2 justify-center p-3">
          {cart.map((items) => (
            <SummaryItems items={items} key={items.name} />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className="grid justify-items-center p-4 text-md gap-2 w-fit place-content-center border border-gray-900 ">
            <p className="">
              Your order will delivered at
              <span className=""> {address}</span>,
            </p>
            <p className="">Within 2 days from today </p>
            <p className="">
              You must pay <span className="text-sm font-semibold">$</span>
              <span className="font-semibold">{totalPrice}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="px-1 py-2 flex justify-center">
        <Button
          label="Back to cart"
          padding="p-1.5"
          backgroundColor="bg-gray-600 text-gray-50 hover:bg-gray-800"
          icon={<HiArrowLeft />}
        />
      </div>
    </PageWrapper>
  );
}

export async function loader({ params }) {
  const order = await getCheckout(params.orderId);
  return order;
}

export default Checkout;
