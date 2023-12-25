import { useDispatch } from 'react-redux';
import { HiTrash } from 'react-icons/hi2';
import { deleteItem } from '../cart/cartSlice';
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
    <>
      <div className="sm:w-[100px] h-20 shadow-lg shadow-gray-900">
        <img src={img} alt={name} className="object-contain  h-full w-full " />
      </div>
      <div className="col-span-2 ">
        <h1>{name}</h1>
        <p className="text-gray-400">
          {size} / {material}{' '}
        </p>
      </div>
      <div className="text-right pr-2 flex">
        <h1>${price}</h1>
        <button onClick={() => dispatch(deleteItem(id))}>
          <HiTrash />
        </button>
      </div>
    </>
  );
}

export default CheckoutItem;
