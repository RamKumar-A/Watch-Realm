import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiMinusSmall, HiPlusSmall, HiTrash } from 'react-icons/hi2';

import { useUpdateCartItem } from './useUpdateCartItem';
import { useDeleteCartItem } from './useDeleteCartItem';
import { useCart } from './useCart';

import SuccessToast from '../../ui/SuccessToast';
import ErrorToast from '../../ui/ErrorToast';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { useState } from 'react';

function CartItems() {
  const { cart } = useCart();
  const { updateCartItem } = useUpdateCartItem();
  const { deleteCartItem, isPending: isDeleting } = useDeleteCartItem();

  const [updatingItemId, setUpdatingItemId] = useState(null);

  const cartItems = cart?.data.items;

  function handleUpdateQuantity(itemId, quantity) {
    setUpdatingItemId(itemId);
    updateCartItem(
      { itemId, quantity },
      {
        onSettled: () => setUpdatingItemId(null),
      }
    );
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
    <motion.div className="space-y-6 lg:flex-[1_1_25%]">
      <AnimatePresence>
        {cartItems?.map((item) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            key={item?._id}
            className="bg-secondary-default p-6 rounded-lg shadow grid sm:grid-flow-col place-content-between place-items-center gap-6 border border-highlight-default"
          >
            <div className="w-full flex items-center justify-start gap-2">
              <div className="w-20 h-20 ">
                <img
                  src={item?.watch?.imageCover}
                  alt={item?.watch?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="">
                <h2 className="text-base md:text-lg font-semibold line-clamp-2">
                  {item?.watch?.name}
                </h2>
                <p className="opacity-65 max-md:text-sm">
                  ₹{item?.watch?.price}
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-4">
                <Button
                  size="small"
                  variant="secondary"
                  rounded="full"
                  className={`${item?.quantity <= 1 && 'pointer-events-none'}`}
                  // onClick={() => updateQuantity(item._id, +item.quantity - 1)}
                  onClick={() =>
                    handleUpdateQuantity(item?._id, +item?.quantity - 1)
                  }
                >
                  <HiMinusSmall size={14} />
                </Button>
                <div className="w-5 flex items-center justify-center">
                  {updatingItemId === item?._id ? (
                    <Spinner small background />
                  ) : (
                    item?.quantity
                  )}
                </div>
                <Button
                  size="small"
                  variant="secondary"
                  rounded="full"
                  className=""
                  // onClick={() => updateQuantity(item._id, +item.quantity + 1)}
                  onClick={() =>
                    handleUpdateQuantity(item?._id, +item?.quantity + 1)
                  }
                >
                  <HiPlusSmall size={14} />
                </Button>
              </div>
              <div>
                <Button
                  size="small"
                  rounded="small"
                  variant="danger"
                  className=""
                  onClick={() => handleRemoveCartItem(item._id)}
                  disabled={isDeleting}
                >
                  <HiTrash size={12} className="" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default CartItems;
