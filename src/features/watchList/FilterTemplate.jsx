import { useState } from 'react';
import FilterButtons from './FilterButtons';
import FilterPrice from './FilterPrice';
import FilterCategory from './FilterCategory';
import FilterMaterial from './FilterMaterial';
import FilterSize from './FilterSize';
import FilterBrand from './FilterBrand';
import { useSelector } from 'react-redux';
import { getAllBrands, getAllCategories, getAllWatches } from './filterSlice';

function FilterTemplate({ classes, openFilters, children }) {
  const watch = useSelector(getAllWatches);
  const brands = useSelector(getAllBrands);
  const categories = useSelector(getAllCategories);
  const [brandIds, setBrandIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [materialType, setMaterialType] = useState([]);
  const [size, setSize] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000000);
  // const { dispatch } = useFilter();
  // const isFilterOpen = useSelector(getIsFilterOpen);
  const uniqueMaterial = [
    ...new Set(watch.map((material) => material.material_type)),
  ];

  const uniqueSize = [...new Set(watch.map((size) => size.size))];

  return (
    <>
      <div
        className={`${
          openFilters ? 'block' : 'hidden'
        } sm:block h-full space-y-2 w-56 overflow-y-auto`}
      >
        <FilterButtons title="Price" noMap>
          <FilterPrice setMax={setMax} setMin={setMin} min={min} max={max} />
        </FilterButtons>

        <FilterButtons title="Categories">
          {categories?.map((items) => (
            <div
              className="flex items-center justify-start gap-2 py-1"
              key={items?.name}
            >
              <FilterCategory
                items={items || []}
                categoryIds={categoryIds}
                setCategoryIds={setCategoryIds}
              />
            </div>
          ))}
        </FilterButtons>

        <FilterButtons title="Material">
          {uniqueMaterial?.map((items) => (
            <div
              className="flex items-center justify-start gap-2 py-1"
              key={items?.name}
            >
              <FilterMaterial
                items={items || []}
                materialType={materialType}
                setMaterialType={setMaterialType}
              />
            </div>
          ))}
        </FilterButtons>

        <FilterButtons title="Size">
          {uniqueSize?.map((items) => (
            <div
              className="flex items-center justify-start gap-2 py-1"
              key={items?.name}
            >
              <FilterSize items={items || []} size={size} setSize={setSize} />
            </div>
          ))}
        </FilterButtons>

        <FilterButtons title="Brand">
          {brands?.map((items, i) => (
            <div
              className="flex items-center justify-start gap-2 py-1"
              key={items?.name}
            >
              <FilterBrand
                items={items || []}
                setBrandIds={setBrandIds}
                brandIds={brandIds}
              />
            </div>
          ))}
        </FilterButtons>
        {children}
      </div>
    </>
  );
}

export default FilterTemplate;

/* <div className="flex items-center justify-between">
          <button className="text-lg">Filters</button>
          <button className="text-sm">Clear All</button>
        </div> */

/* <div className="" onClick={clearAll}>
          <button className="flex justify-between text-xl items-center border-l-4 border-gray-950 w-full bg-gray-300 px-2">
            <span className="">Clear All</span>
            <HiXMark />
          </button>
        </div> */
