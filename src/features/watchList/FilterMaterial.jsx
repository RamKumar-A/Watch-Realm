import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterMaterial } from './filterSlice';

function FilterMaterial({ items, materialType, setMaterialType }) {
  const dispatch = useDispatch();

  function handleChange(e) {
    const { value, checked } = e.target;
    const newSelectedMaterial = checked
      ? [...new Set([...materialType, value])]
      : materialType.filter((rmvType) => rmvType !== value);

    setMaterialType(newSelectedMaterial);
  }

  useEffect(
    function () {
      dispatch(filterMaterial(materialType));
    },
    [dispatch, materialType]
  );

  return (
    <>
      <input
        type="checkbox"
        id={items}
        className="accent-green-600"
        value={items}
        checked={materialType.includes(items)}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={items}>{items}</label>
    </>
  );
}

export default FilterMaterial;
