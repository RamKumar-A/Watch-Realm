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

function CartItems() {
  const { cart } = useCart();
  const { updateCartItem, isPending: isCartItemUpdating } = useUpdateCartItem();
  const { deleteCartItem } = useDeleteCartItem();

  const cartItems = cart?.data.items;

  function handleUpdateQuantity(itemId, quantity) {
    updateCartItem({ itemId, quantity });
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
    <motion.div className="space-y-3 lg:flex-[1_1_25%]">
      <AnimatePresence mode="wait" initial={false}>
        {cartItems?.map((item, i) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            key={i}
            className="bg-secondary-default p-6 rounded-lg shadow grid sm:grid-flow-col place-content-between place-items-center gap-6 "
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
                <p className="opacity-50 max-md:text-sm">
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
                <div>
                  {isCartItemUpdating ? (
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
                  // onClick={() => removeItem(item._id)}
                  onClick={() => handleRemoveCartItem(item?._id)}
                >
                  <HiTrash size={12} className="" />
                  {/* Remove */}
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
