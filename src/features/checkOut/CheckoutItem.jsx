import { useDispatch } from 'react-redux';
import { HiTrash } from 'react-icons/hi2';
import { deleteItem } from '../cart/cartSlice';
import Button from '../../ui/Button';
import { motion } from 'framer-motion';
function CheckoutItem({ item }) {
  const dispatch = useDispatch();
  const {
    id,
    size,
    image_url: img,
    name,
    material_type: material,
    price_range: price,
  } = item;
  return (
    <motion.div
      className="w-full grid sm:grid-cols-[auto_1fr_auto] max-sm:justify-items-center border border-gray-300 bg-gray-200 rounded-md p-2 gap-2 object-right-top"
      layout
      initial={{ scale: 0, transformOrigin: 'right' }}
      animate={{
        transformOrigin: 'left',
        scale: 1,
      }}
      exit={{ transformOrigin: 'right', scale: 0 }}
    >
      <div className="w-32 ">
        <img
          src={img}
          alt={name}
          className="object-contain aspect-square h-full p-1 w-full"
        />
      </div>
      <div className="self-center max-sm:text-center space-y-1">
        <h1 className="text-sm font-bold">{name}</h1>
        <p className="text-gray-400 text-md">
          {size} / {material}{' '}
        </p>
      </div>
      <div className=" flex items-center gap-1">
        <h1 className="">
          <span className="text-xs">$</span>
          <span className="text-xl font-semibold">{price}</span>
        </h1>
        <Button
          handler={() => dispatch(deleteItem(id))}
          label={<HiTrash />}
          backgroundColor="hover:bg-red-600"
        />
      </div>
    </motion.div>
  );
}

export default CheckoutItem;
