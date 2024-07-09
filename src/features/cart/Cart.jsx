import CartItems from './CartItems';
import { useSelector } from 'react-redux';
import { getCart } from './cartSlice';
import { useNavigate } from 'react-router-dom';
import Empty from '../../ui/Empty';
import PageWrapper from '../../PageWrapper';
import Button from '../../ui/Button';
import { HiArrowLeft } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import PriceDetails from './PriceDetails';

function Cart() {
  const navigate = useNavigate();
  const cart = useSelector(getCart);
  return (
    <PageWrapper>
      <motion.div className="relative   ">
        <h1 className="w-full p-3 text-2xl text-center font-extrabold tracking-wide">
          My Cart
        </h1>

        <div className="flex flex-wrap justify-evenly py-2 h-full ">
          {cart.length === 0 ? (
            <div className="">
              <Empty>Your cart is empty</Empty>
            </div>
          ) : (
            <>
              <div className="grid place-content-center w-full lg:w-fit  ">
                {cart.map((items) => (
                  <CartItems items={items} key={items.name} />
                ))}
              </div>
              <div className="sticky top-1 lg:w-[30%] w-[85%] h-fit border rounded-sm p-2 my-2 ">
                <PriceDetails />
              </div>
            </>
          )}
        </div>
        <div className=" p-1 h-fit">
          <Button
            label="Back to Shop"
            padding="p-1.5"
            icon={<HiArrowLeft size={15} />}
            handler={() => navigate('/shop')}
          />
        </div>
      </motion.div>
    </PageWrapper>
  );
}

export default Cart;
