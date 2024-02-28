import { useSelector } from 'react-redux';
import { Form, redirect, useNavigate } from 'react-router-dom';
import { getCart } from '../cart/cartSlice';
import CheckoutItem from './CheckoutItem';
import { createNewCheckout } from '../../services/apiWatches';

const summaryDetails = 'flex justify-between items-center py-2 px-0';
const heading1 = 'text-center font-semibold';
const input = 'border border-gray-600 h-10 w-full pl-2';
const price = 'text-gray-600';
const label = 'text-sm font-semibold py-7 px-0 ';

function CreateNewCheckout() {
  const navigate = useNavigate();
  const cart = useSelector(getCart);

  const subtotal = cart
    .map((price) => price.price_range)
    .reduce((cur, price) => cur + price, 0);
  const totalPrice = subtotal + 200;

  if (cart.length === 0) return navigate('/cart');
  return (
    <div className="grid lg:grid-cols-2 sm:m-5 lg:m-8 xl:mx-20">
      <Form method="POST" className="m-5 lg:m-10">
        <div className="flex flex-col">
          <label className={label} htmlFor="contact">
            Contact
          </label>
          <input
            type="email"
            id="contact"
            name="email"
            className={` ${input} px-4`}
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className={label} htmlFor="state">
            Deliver At & To
          </label>
          <div>
            <select
              name="state"
              id="state"
              className="relative w-[75%] sm:w-full h-12 border border-gray-500 pt-2 px-3 "
              required
            >
              <option value="" className="text-xs ">
                Select
              </option>
              <option value="tamilnadu" className="text-xs ">
                TamilNadu
              </option>
              <option value="andhra" className="text-xs ">
                Andhra
              </option>
              <option value="kerala" className="text-xs ">
                Kerala
              </option>
            </select>
            <label
              htmlFor="state"
              className="absolute left-14 sm:left-[4.8rem] lg:left-[8.5rem]  p-0 text-gray-400 text-xs translate-y-1 "
            >
              State
            </label>
          </div>

          <div className="grid sm:grid-cols-2 py-5">
            <div className="sm:mr-2 pb-5">
              <input
                className={input}
                type="text"
                name="fName"
                placeholder="first name"
                required
              />
            </div>
            <div className="sm:ml-2">
              <input
                className={input}
                type="text"
                name="lName"
                placeholder="last name (optional)"
              />
            </div>
          </div>
          <div>
            <input
              className={input}
              type="text"
              placeholder="Address"
              name="address"
              required
            />
          </div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>
        <div className="flex items-center justify-center h-10 shadow-sm shadow-gray-900 font-bold text-xl mt-5 cursor-pointer">
          <button type="submit" className="">
            Submit & Buy
          </button>
        </div>
      </Form>
      <div className="m-3 sm:m-10">
        <h1 className="text-2xl py-4 font-bold">Checkout Summary</h1>
        <div className="grid grid-cols-4 text-center py-10 px-2 shadow-md shadow-gray-900 ">
          {cart.map((item) => (
            <CheckoutItem item={item} key={item.id} />
          ))}
        </div>
        <div className="py-10 sm:px-5">
          <div className={summaryDetails}>
            <h1 className={heading1}>Subtotal</h1>
            <p className={price}>${subtotal}</p>
          </div>

          <div className={summaryDetails}>
            <h1 className={heading1}>Shipping</h1>
            <p className={price}>$200</p>
          </div>

          <div className={summaryDetails}>
            <h1 className={heading1}>Total</h1>
            <p className={price}>${totalPrice}</p>
          </div>
        </div>
        {/* <div className="w-full h-10 sm:h-14 bg-gray-500 text-center p-1 sm:p-3 cursor-pointer shadow-md shadow-gray-900">
          <button className="text-xl text-gray-50"> Buy Now</button>
        </div> */}
      </div>
    </div>
  );
}

export async function formDataAction({ request }) {
  const res = await request.formData();
  const data = Object.fromEntries(res);
  console.log(data);

  const checkout = {
    ...data,
    cart: JSON.parse(data.cart),
  };

  const newCheckout = await createNewCheckout(checkout);

  console.log(newCheckout, newCheckout.id);

  localStorage.setItem(newCheckout.id, JSON.stringify(newCheckout));

  return redirect(`/order/${newCheckout.id}`);
}

export default CreateNewCheckout;
