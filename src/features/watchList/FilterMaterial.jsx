import { useEffect, useState } from 'react';
import { useFilter } from './Context';

function FilterMaterial({ items, selectedMaterial, setSelectedMaterial }) {
  const [materialName, setMaterialName] = useState('');

  const isChecked = items === selectedMaterial;
  const { dispatch } = useFilter();

  function handleChange(e) {
    const { checked, value } = e.target;

    setSelectedMaterial(isChecked ? 0 : items);

    if (checked) setMaterialName(value);
  }

  useEffect(
    function () {
      if (isChecked) {
        dispatch({ type: 'filterMaterial', payload: materialName });
      } else {
        dispatch({ type: 'removeFilterMaterial', payload: materialName });
      }
    },

    [dispatch, materialName, isChecked]
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

export default FilterMaterial;
