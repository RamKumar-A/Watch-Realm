import { useDispatch } from 'react-redux';
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from './cartSlice';
import { HiMinus, HiPlus, HiTrash } from 'react-icons/hi2';
import Button from '../../ui/Button';
import { motion } from 'framer-motion';

function Quantity({ className, id, quantity }) {
  const dispatch = useDispatch();

  function handleDelete(ids) {
    dispatch(deleteItem(ids));
  }
  return (
    <div className="flex items-center justify-center gap-2 p-1 ">
      <Button
        className={`
              ${className ? '' : ''}`}
        handler={() => dispatch(decreaseItemQuantity(id))}
        label={<HiMinus size={15} />}
        padding={className ? 'p-0.5' : 'p-1'}
      />

      <h1 className={className ? 'text-sm' : 'p-1'}>{quantity}</h1>

      <Button
        className={`
             ${className ? '' : ''}
             `}
        handler={() => dispatch(increaseItemQuantity(id))}
        label={<HiPlus size={15} />}
        padding={className ? 'p-0.5' : 'p-1'}
      />
      <Button
        className={` ${className ? ' ' : ''}`}
        handler={() => handleDelete(id)}
        label={<HiTrash size={15} className="" />}
        padding={className ? 'p-0.5' : 'p-1'}
        backgroundColor="hover:bg-red-600"
      />
    </div>
  );
}

function CartItems({ items, classes }) {
  const {
    id,
    name,
    price_range,
    size,
    material_type,
    image_url,
    quantity,
    totalPrice,
  } = items;

  const tagList = [
    { tagTitle: 'Material Type', tagVal: material_type },
    { tagTitle: 'Size', tagVal: size },
    { tagTitle: 'Price', tagVal: price_range },
  ];

  return (
    <motion.div
      className={` border border-gray-900 grid p-2 
        ${
          classes
            ? 'w-full place-items-center my-2'
            : 'm-2 sm:grid-cols-[12rem_1fr_auto] max-sm:justify-items-center px-4'
        }`}
      layout
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
    >
      <div className="grid items-center justify-center w-full p-1  ">
        <div
          className={`
           ${classes ? 'w-full h-40 sm:h-48' : 'w-full h-40'}`}
        >
          <img
            src={image_url}
            alt={id}
            className={`object-contain aspect-video w-full h-full  ${
              classes ? 'p-3' : 'p-3'
            }`}
          />
        </div>
        <Quantity className={classes} quantity={quantity} id={id} />
      </div>
      <div
        className={`grid p-2  ${
          classes
            ? 'place-items-center'
            : ' items-center place-items-center sm:place-items-start'
        }`}
      >
        <h1
          className={` py-2 font-medium text-center sm:text-left ${
            classes ? ' text-lg' : ' text-lg'
          }`}
        >
          {name}
        </h1>
        <div
          className={
            classes ? 'hidden' : 'place-self-center sm:place-self-start '
          }
        >
          {tagList.map((tag) => (
            <p
              className={`flex items-center ${
                tag.tagTitle === 'Price'
                  ? 'py-2 font-semibold text-lg'
                  : 'text-md'
              } `}
              key={tag.tagTitle}
            >
              <span className="w-32 py-1">
                {tag.tagTitle}{' '}
                {tag.tagTitle === 'Price' && (
                  <span className="text-xs font-thin">(per item)</span>
                )}{' '}
              </span>
              {tag.tagTitle !== 'Price' && <span> : </span>}
              <span
                className={`${tag.tagTitle === 'Price' ? 'font-semibold' : ''}`}
              >
                {tag.tagTitle === 'Price' && <span className="text-sm">$</span>}
                {tag.tagVal}
              </span>
            </p>
          ))}
          <div className="w-full flex justify-start place-self-start">
            <button className="bg-blue-500 text-gray-50 p-0.5 px-1 text-sm rounded-md">
              Share
            </button>
          </div>
        </div>
      </div>
      <div
        className={` font-bold place-self-center text-2xl text-gray-900 rounded-md  ${
          classes ? 'p-1 px-2 ' : 'shadow shadow-gray-300 p-2'
        }`}
      >
        <h1 className={classes ? '' : 'text-center  '}>
          <span className="text-xs">$</span>
          <span>{totalPrice}</span>
        </h1>
      </div>
    </motion.div>
  );
}

export default CartItems;
