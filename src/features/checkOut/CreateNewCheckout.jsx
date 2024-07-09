import { useSelector } from 'react-redux';
import { Form, redirect, useNavigate } from 'react-router-dom';
import { getCart } from '../cart/cartSlice';
import CheckoutItem from './CheckoutItem';
import { createNewCheckout } from '../../services/apiWatches';
import PageWrapper from '../../PageWrapper';
import CheckoutForm from './CheckoutForm';
import PriceDetails from '../cart/PriceDetails';
import { HiChevronUp } from 'react-icons/hi2';
import { useState } from 'react';
import Button from '../../ui/Button';
import { AnimatePresence } from 'framer-motion';

function CreateNewCheckout() {
  const navigate = useNavigate();
  const cart = useSelector(getCart);

  const [summaryOpen, setSummaryOpen] = useState(false);

  if (cart.length === 0) return navigate('/cart');

  return (
    <PageWrapper>
      <div className="grid lg:grid-cols-2  ">
        <div className="h-full">
          <Form method="POST" className="lg:sticky top-2 h-fit p-3">
            <CheckoutForm />
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <div className="w-full flex items-center justify-center p-2">
              <Button type="submit" padding="p-1.5" label="Submit & Buy" />
            </div>
          </Form>
        </div>
        <div className="p-3">
          <h1 className="py-3 px-2 text-lg font-semibold ">
            <span>Checkout Summary</span>
          </h1>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {summaryOpen
                ? cart.map((item) => <CheckoutItem item={item} key={item.id} />)
                : cart
                    .slice(0, 1)
                    .map((item) => <CheckoutItem item={item} key={item.id} />)}
            </AnimatePresence>
          </div>
          {cart.length > 1 && (
            <div className="w-full flex justify-center items-center p-3 sticky bottom-1 h-fit">
              <button
                className="flex  items-center bg-gray-400 text-gray-100 p-1 px-3 rounded-full gap-3 "
                onClick={() => setSummaryOpen(!summaryOpen)}
              >
                <span className="text-sm">
                  {summaryOpen ? 'Show Less' : 'Show All'}
                </span>
                <HiChevronUp size={13} />
              </button>
            </div>
          )}
          <div>
            <PriceDetails checkoutButtons={false} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export async function formDataAction({ request }) {
  const res = await request.formData();
  const data = Object.fromEntries(res);
  // console.log(data);

  const checkout = {
    ...data,
    cart: JSON.parse(data.cart),
  };

  const newCheckout = await createNewCheckout(checkout);

  // console.log(newCheckout, newCheckout.id);

  localStorage.setItem(newCheckout.id, JSON.stringify(newCheckout));

  return redirect(`/order/${newCheckout.id}`);
}

export default CreateNewCheckout;
