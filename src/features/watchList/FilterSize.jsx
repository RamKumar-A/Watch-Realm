import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterSize } from './filterSlice';

function FilterSize({ items, size, setSize }) {
  const dispatch = useDispatch();

  function handleChange(e) {
    const { value, checked } = e.target;
    const newSelectedSize = checked
      ? [...new Set([...size, value])]
      : size.filter((rmvSize) => rmvSize !== value);

    setSize(newSelectedSize);
  }

  useEffect(
    function () {
      dispatch(filterSize(size));
    },
    [dispatch, size]
  );

  return (
    <>
      <input
        type="checkbox"
        className="accent-green-600"
        id={items}
        value={items}
        checked={size.includes(items)}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={items}>{items}</label>
    </>
  );
}

export default FilterSize;
