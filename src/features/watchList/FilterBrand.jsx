import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterBrand } from './filterSlice';

function FilterBrand({ items, setBrandIds, brandIds }) {
  const dispatch = useDispatch();
  function handleChange(e) {
    const { id, checked } = e.target;
    const newSelectedIds = checked
      ? [...new Set([...brandIds, parseInt(id)])]
      : brandIds.filter((rmvId) => rmvId !== parseInt(id));
    setBrandIds(newSelectedIds);
  }

  useEffect(
    function () {
      dispatch(filterBrand(brandIds));
    },
    [dispatch, brandIds]
  );

  return (
    <>
      <input
        type="checkbox"
        id={items.id}
        className="accent-green-600 "
        value={items.name}
        checked={brandIds.includes(parseInt(items.id))}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={items.id}>{items.name}</label>
    </>
  );
}

export default FilterBrand;
