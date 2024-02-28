import { useEffect, useState } from 'react';
import { useFilter } from './Context';

function FilterBrand({ items, setBrandIds, brandIds }) {
  const [isChecked, setIsChecked] = useState(brandIds.includes(items.id));
  const { dispatch } = useFilter();

  function handleChange(e) {
    const { id, checked } = e.target;
    setBrandIds((prev) => {
      if (checked) {
        const uniqueIds = new Set([...prev, parseInt(id)]);
        setIsChecked(true);
        return [...uniqueIds];
      } else {
        const updatedIds = prev.filter((rmvId) => rmvId !== parseInt(id));
        console.log(updatedIds.length > 0);
        setIsChecked(updatedIds.length > 0);
        return updatedIds;
      }
    });
  }

  useEffect(
    function () {
      if (isChecked || brandIds.length === 0)
        dispatch({ type: 'filterBrand', payload: brandIds });
    },
    [dispatch, brandIds, isChecked]
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
      <label htmlFor={items.id}>{items.name}</label>
    </>
  );
}

export default FilterBrand;
