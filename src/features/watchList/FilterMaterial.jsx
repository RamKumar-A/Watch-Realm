import { useEffect, useState } from 'react';
import { useFilter } from './Context';

function FilterMaterial({ items, materialType, setMaterialType }) {
  const [isChecked, setIsChecked] = useState(materialType.includes(items));
  const { dispatch } = useFilter();

  function handleChange(e) {
    const { value, checked } = e.target;
    setMaterialType((prev) => {
      if (checked) {
        const uniqueValue = new Set([...prev, value]);
        setIsChecked(true);
        return [...uniqueValue];
      } else {
        const updatedValue = prev.filter((rmvType) => rmvType !== value);
        setIsChecked(updatedValue.length > 0); // Check if there are still selected checkboxes
        return updatedValue;
      }
    });
  }

  useEffect(
    function () {
      if (isChecked || materialType.length === 0) {
        dispatch({ type: 'filterMaterial', payload: materialType });
      }
    },

    [dispatch, materialType, isChecked]
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
      <label htmlFor={items}>{items}</label>
    </>
  );
}

export default FilterMaterial;
