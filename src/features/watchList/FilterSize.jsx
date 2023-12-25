import { useEffect, useState } from 'react';
import { useFilter } from './Context';

function FilterSize({ items, selectedSize, setSelectedSize }) {
  const [size, setSize] = useState('');
  const { dispatch } = useFilter();

  const isChecked = items === selectedSize;

  function handleChange(e) {
    const { value, checked } = e.target;
    setSelectedSize(isChecked ? null : items);
    if (checked) setSize(value);
  }

  useEffect(
    function () {
      if (isChecked) {
        dispatch({ type: 'filterSize', payload: size });
      } else {
        dispatch({ type: 'removeFilterSize', payload: size });
      }
    },
    [isChecked, dispatch, size]
  );

  return (
    <>
      <input
        type="checkbox"
        id={items}
        className="form-checkbox w-5 accent-gray-700 "
        value={items}
        checked={isChecked}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={items}>
        {items} <span className="text-xs">({items.length})</span>
      </label>
    </>
  );
}

export default FilterSize;
