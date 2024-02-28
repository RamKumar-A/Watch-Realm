import { useEffect, useState } from 'react';
import { useFilter } from './Context';
import FilterButtons from './FilterButtons';
import FilterPrice from './FilterPrice';
import FilterCategory from './FilterCategory';
import FilterMaterial from './FilterMaterial';
import FilterSize from './FilterSize';
import FilterBrand from './FilterBrand';
import { HiXMark } from 'react-icons/hi2';

function FilterTemplate({ watch, brands, categories, classes, children }) {
  const [brandIds, setBrandIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [materialType, setMaterialType] = useState([]);
  const [size, setSize] = useState([]);
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('5000000');

  const { dispatch } = useFilter();

  const uniqueMaterial = [
    ...new Set(watch.map((material) => material.material_type)),
  ];

  const uniqueSize = [
    ...new Set(watch.map((size) => size.size).filter((size) => size)),
  ];

  useEffect(
    function () {
      dispatch({ type: 'filterPrice', payload: { min: min, max: max } });
    },
    [dispatch, min, max]
  );

  function clearAll() {
    // Reset the state after the render cycle
    setTimeout(() => {
      setBrandIds([]);
      setCategoryIds([]);
      setMaterialType([]);
      setSize([]);
      setMin('0');
      setMax('5000000');
      dispatch({ type: 'clearFilters' });
    }, 0);
  }

  return (
    <>
      <div className={classes}>
        <div className="mb-10">
          <button className="flex justify-between text-xl items-center border-l-8 border-gray-900 w-full">
            <h1 className="pl-2">Filters</h1>
          </button>
        </div>

        <div className="mb-4" onClick={clearAll}>
          <button className="flex justify-between text-xl items-center border-l-8 border-gray-950 w-full bg-gray-300 h-10">
            <h1 className="pl-2">Clear All</h1>
            <h1 className="pr-2">
              <HiXMark />
            </h1>
          </button>
        </div>

        <FilterButtons title="Price">
          <FilterPrice setMax={setMax} setMin={setMin} min={min} max={500000} />
        </FilterButtons>

        <FilterButtons title="Categories">
          {categories?.map((items) => {
            return (
              <FilterCategory
                items={items || []}
                key={items?.name}
                categoryIds={categoryIds}
                setCategoryIds={setCategoryIds}
              />
            );
          })}
        </FilterButtons>

        <FilterButtons title="Material">
          {uniqueMaterial?.map((items) => {
            return (
              <div
                className="my-5 text-xl font-light flex  gap-3 px-5"
                key={items?.name}
              >
                <FilterMaterial
                  key={items?.name}
                  items={items || []}
                  materialType={materialType}
                  setMaterialType={setMaterialType}
                />
              </div>
            );
          })}
        </FilterButtons>

        <FilterButtons title="Size">
          {uniqueSize?.map((items) => {
            return (
              <div
                className="my-5 text-xl font-light flex  gap-3 px-5"
                key={items?.name}
              >
                <FilterSize
                  key={items?.name}
                  items={items || []}
                  size={size}
                  setSize={setSize}
                />
              </div>
            );
          })}
        </FilterButtons>

        <FilterButtons title="Brand">
          {brands?.map((items) => {
            return (
              <div
                className="my-5 text-xl font-light flex  gap-3 px-5"
                key={items?.name}
              >
                <FilterBrand
                  key={items?.name}
                  items={items || []}
                  setBrandIds={setBrandIds}
                  brandIds={brandIds}
                />
              </div>
            );
          })}
        </FilterButtons>
        {children}
      </div>
    </>
  );
}

export default FilterTemplate;
