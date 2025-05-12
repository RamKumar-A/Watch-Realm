import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  HiChevronRight,
  HiMinusSmall,
  HiOutlineTrash,
  HiPlusSmall,
} from 'react-icons/hi2';

import { useUser } from '../User/useUser';
import { useCart } from './useCart';
import { useUpdateCartItem } from './useUpdateCartItem';
import { useDeleteCartItem } from './useDeleteCartItem';

import SuccessToast from '../../ui/SuccessToast';
import ErrorToast from '../../ui/ErrorToast';
import Button from '../../ui/Button';

function CartModal({ onClose }) {
  const navigate = useNavigate();

  const { cart } = useCart();
  const { isAuthenticated } = useUser();

  const cartItems = isAuthenticated ? cart?.data?.items : [];
  const totalPrice = isAuthenticated ? cart?.data?.totalPrice : 0;

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] p-1 overflow-auto">
      <div className="p-2 flex items-center justify-between h-[10vh]">
        <Button
          size="small"
          variant="text"
          className="border border-hightlight-default  text-contrastText-primary p-2"
          onClick={onClose}
        >
          <HiChevronRight />
        </Button>
        <Button
          onClick={() => {
            onClose();
            navigate('/my-cart');
          }}
          variant="secondary"
        >
          View Cart
        </Button>
      </div>
      <div className=" h-full grid grid-rows-[auto_1fr_auto] p-2 text-contrastText-primary z-50">
        <h1 className="text-lg font-extrabold h-[5vh]">YOUR CART</h1>
        <div
          className={`overflow-y-auto h-[70vh] grid gap-2 
          ${cartItems?.length > 0 ? 'content-start' : 'content-center'}
          `}
        >
          {!isAuthenticated ? (
            <div className="flex flex-col gap-6 items-center">
              <h2>Please login to continue</h2>
              <Button className="w-full" onClick={() => navigate('/login')}>
                Login
              </Button>
            </div>
          ) : cartItems?.length > 0 ? (
            cartItems?.map((item) => <CartItems item={item} key={item?._id} />)
          ) : (
            <div className="flex flex-col gap-6">
              <h2>Your cart is empty</h2>
              {/* <Button variant="secondary">Go to Shop</Button> */}
              <Button onClick={() => navigate('/shop')}>Go to Shop</Button>
            </div>
          )}
        </div>
        <div className="p-1 space-y-2 my-auto h-[8vh] border-t-2 border-highlight-dark content-center">
          {/* <div className="w-full border border-highlight-default" /> */}
          <div className="w-full flex justify-between items-center  ">
            <h1 className="font-medium text-md"> Sub Total</h1>
            <span className="text-xl font-extrabold">
              <span className="text-xs">₹ {totalPrice || 0}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItems({ item }) {
  const { updateCartItem } = useUpdateCartItem();
  const { deleteCartItem } = useDeleteCartItem();

  const watch = item?.watch || {};
  const quantity = item?.quantity || 0;

  function handleUpdateQuantity(itemId, newQuantity) {
    updateCartItem({ itemId, quantity: newQuantity });
  }

  function handleRemoveCartItem(itemId) {
    deleteCartItem(
      { itemId },
      {
        onSuccess: () => {
          toast.success((t) => (
            <SuccessToast t={t}>Item deleted from cart</SuccessToast>
          ));
        },
        onError: () => {
          toast.error((t) => (
            <ErrorToast t={t}>Error while deleting item</ErrorToast>
          ));
        },
      }
    );
  }

  return (
    <div className="flex items-center bg-secondary-default w-full gap-1.5 p-1.5 h-36">
      <div className="w-24 md:w-24 h-24 md:h-24 border border-highlight-light p-1">
        <img
          className="w-full h-full object-contain scale-105"
          src={watch?.imageCover}
          alt={watch?.name}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm line-clamp-2">{watch?.name}</h3>
        <span className="font-semibold text-lg">₹ {watch?.price}</span>
        <div className="flex items-center gap-2">
          <Button
            size="small"
            variant="secondary"
            onClick={() => handleUpdateQuantity(item?._id, +item?.quantity - 1)}
          >
            <HiMinusSmall />
          </Button>
          <span>{quantity}</span>
          <Button
            size="small"
            variant="secondary"
            onClick={() => handleUpdateQuantity(item?._id, +item?.quantity - 1)}
          >
            <HiPlusSmall />
          </Button>

          <Button
            size="small"
            variant="danger"
            rounded="small"
            onClick={() => handleRemoveCartItem(item?._id)}
          >
            <HiOutlineTrash />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
