import { useEffect, useState } from 'react';
import { useFilter } from './Context';

function FilterCategory({ items, selectedCategory, setSelectedCategory }) {
  const [categoryId, setCategoryId] = useState(0);

  const isChecked = items.id === selectedCategory;

  const { dispatch } = useFilter();
  useEffect(
    function () {
      if (isChecked) {
        dispatch({ type: 'filterCategory', payload: categoryId });
      } else {
        dispatch({ type: 'removeFilterCategory', payload: categoryId });
      }
    },
    [categoryId, dispatch, isChecked]
  );

  function handleChange(e) {
    const { id, checked } = e.target;
    setSelectedCategory(isChecked ? null : items.id);
    if (checked) setCategoryId(Number(id));
  }

  return (
    <div className="my-5 text-xl font-light flex gap-3 px-5">
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
    </div>
  );
}

export default FilterCategory;
