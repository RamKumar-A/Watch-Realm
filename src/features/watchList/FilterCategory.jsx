import { useEffect, useState } from 'react';
import { useFilter } from './Context';

function FilterCategory({ items, categoryIds, setCategoryIds }) {
  const [isChecked, setIsChecked] = useState(categoryIds.includes(items.id));
  const { dispatch } = useFilter();

  function handleChange(e) {
    const { id, checked } = e.target;
    setCategoryIds((prev) => {
      if (checked) {
        const uniqueIds = new Set([...prev, parseInt(id)]);
        setIsChecked(true);
        return [...uniqueIds];
      } else {
        const updatedIds = prev.filter((rmvId) => rmvId !== parseInt(id));
        setIsChecked(updatedIds.length > 0);
        return updatedIds;
      }
    });
  }

  useEffect(
    function () {
      if (isChecked || categoryIds.length === 0) {
        dispatch({ type: 'filterCategory', payload: categoryIds });
      }
    },
    [categoryIds, dispatch, isChecked]
  );

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
      <label htmlFor={items.id}>{items.name}</label>
    </div>
  );
}

export default FilterCategory;
