import { useEffect, useState } from 'react';
import { useFilter } from './Context';

function FilterBrand({ items, selectedBrand, setSelectedBrand }) {
  const [brandId, setBrandId] = useState(0);
  const isChecked = items.id === selectedBrand;
  const { dispatch } = useFilter();

  function handleChange(e) {
    const { id, checked } = e.target;
    setSelectedBrand(isChecked ? null : items.id);
    if (checked) setBrandId(Number(id));
  }

  useEffect(
    function () {
      if (isChecked) {
        dispatch({ type: 'filterBrand', payload: brandId });
      } else {
        dispatch({ type: 'removeFilterBrand', payload: brandId });
      }
    },
    [dispatch, brandId, isChecked]
  );

  return (
    <>
      <input
        type="checkbox"
        id={items.id}
        className="form-checkbox w-5 accent-gray-700 "
        value={items.name}
        checked={isChecked}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={items.id}>
        {items.name} <span className="text-xs"></span>
      </label>
    </>
  );
}

export default FilterBrand;
