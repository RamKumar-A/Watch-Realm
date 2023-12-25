import { useDispatch } from 'react-redux';
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from './cartSlice';
import { HiMinus, HiPlus, HiTrash } from 'react-icons/hi2';

function CartItems({ items, className }) {
  const dispatch = useDispatch();
  
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

  function handleDelete(id) {
    dispatch(deleteItem(id));
  }

  return (
    <div
      className={`bg-gray-300 border border-gray-900
        ${
          className
            ? 'm-2'
            : 'grid sm:grid-cols-5  border-b-2 border-gray-900 m-3 place-content-center shadow-lg shadow-gray-900 rounded'
        }`}
    >
      <div
        className={
          className
            ? 'grid grid-cols-2 place-items-center'
            : 'm-2 text-center sm:col-span-3  sm:flex sm:items-center sm:justify-between '
        }
      >
        <div
          className={`object-contain 
           ${
             className
               ? 'w-[9rem] h-[10rem] m-auto'
               : 'w-[105px] h-[105px]  my-10 sm:my-5 mx-auto shadow-sm shadow-gray-700 flex items-center justify-center '
           }`}
        >
          <img
            src={image_url}
            alt={id}
            className={`object-contain
 ${className ? 'mt-2  m-auto h-[160px]' : 'h-[95px] w-[95px] '}`}
          />
        </div>
        <div
          className={` m-auto ${
            className ? '' : `sm:flex items-center sm:justify-center`
          }`}
        >
          <h1
            className={`font-semibold
 ${
   className
     ? 'text-left pt-2 pl-3 '
     : 'text-center text-2xl  sm:text-xl px-3 pt-2  lg:mr-20 '
 }`}
          >
            {name}
          </h1>
          <div className="p-3 font font-normal ">
            <p className={`text-[1rem] font-medium`}>${price_range}</p>
            <p className="text-xs">{size}</p>
            <p className="text-xs">{material_type}</p>
          </div>
        </div>
      </div>
      <div
        className={
          className
            ? 'w-full flex gap-2 p-5 justify-center mx-auto text-xl'
            : 'm-10 md:m-0 lg:mx-5 flex justify-evenly sm:col-span-1 items-center gap-2 sm:justify-center '
        }
      >
        <div className="flex gap-2 items-center justify-center ml-5">
          <button
            className={`bg-gray-800 text-gray-200 rounded-full
              ${
                className
                  ? 'w-5 h-5'
                  : 'text-xs w-8 h-8 lg:w-8 lg:h-8 md:w-5 md:h-5 flex items-center justify-center'
              }`}
            onClick={() => dispatch(decreaseItemQuantity(id))}
          >
            <HiMinus />
          </button>

          <h1 className="lg:w-8 lg:h-8 lg:pt-1 text-center font-semibold">
            {quantity}
          </h1>

          <button
            className={`rounded-full bg-gray-800 text-gray-200
             ${
               className
                 ? 'w-5 h-5 '
                 : 'text-xl w-8 h-8 lg:w-8 lg:h-8 md:w-5 md:h-5 flex items-center justify-center'
             }
            `}
            onClick={() => dispatch(increaseItemQuantity(id))}
          >
            <HiPlus />
          </button>
          <button
            className={
              className
                ? ' h-5 text-[0.9rem] leading-5 rounded-full text-gray-300 bg-gray-800 flex items-center w-5 justify-center'
                : 'w-8 h-8 text-xl pl-1.5'
            }
            onClick={() => handleDelete(id)}
          >
            {<HiTrash className="" />}
          </button>
        </div>
      </div>
      <div
        className={className ? 'pb-5 text-center' : 'grid place-items-center'}
      >
        <h1 className={className ? 'font-medium' : '"pb-5 text-xl'}>
          $ {totalPrice}
        </h1>
      </div>
    </div>
  );
}

export default CartItems;
