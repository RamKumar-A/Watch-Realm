import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterCategory } from './filterSlice';

function FilterCategory({ items, categoryIds, setCategoryIds }) {
  const dispatch = useDispatch();

  function handleChange(e) {
    const { id, checked } = e.target;
    const newSelectedCategoryId = checked
      ? [...new Set([...categoryIds, parseInt(id)])]
      : categoryIds.filter((rmvId) => rmvId !== parseInt(id));

    setCategoryIds(newSelectedCategoryId);
  }

  useEffect(
    function () {
      dispatch(filterCategory(categoryIds));
    },
    [categoryIds, dispatch]
  );

  return (
    <>
      <input
        type="checkbox"
        className="accent-green-600"
        id={items.id}
        value={items.name}
        checked={categoryIds.includes(parseInt(items.id))}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={items.id}>{items.name}</label>
    </>
  );
}

export default FilterCategory;
