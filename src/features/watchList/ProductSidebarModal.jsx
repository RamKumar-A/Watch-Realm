import { useEffect, useState } from 'react';
import FilterBrand from './FilterBrand';
import { useFilter } from './Context';
import FilterCategory from './FilterCategory';
import FilterMaterial from './FilterMaterial';
import FilterSize from './FilterSize';
import FilterPrice from './FilterPrice';
import FilterButtons from './FilterButtons';
import Sort from './Sort';

function ProductSidebarModal({ watch, brands, categories, openFilters }) {
  // console.log(watch);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const [selectedSize, setSelectedSize] = useState(null);

  const { dispatch } = useFilter();

  const allMaterialTypes = watch
    .map((material) => material.material_type)
    .filter((materialType) => materialType);

  const uniqueMaterial = [...new Set(allMaterialTypes)];

  const allSizes = watch.map((size) => size.size).filter((size) => size);

  const uniqueSize = [...new Set(allSizes)];

  const [min, setMin] = useState('');
  const [max, setMax] = useState('5000000');

  useEffect(
    function () {
      dispatch({ type: 'filterPrice', payload: { min: min, max: max } });
    },
    [dispatch, min, max]
  );

  return (
    <>
      <div
        className={`${openFilters ? 'block' : 'hidden'} p-5 w-[250px] sm:block`}
      >
        <div className="mb-10">
          <button className="flex justify-between text-xl items-center border-l-8 border-gray-900 w-full">
            <h1 className="pl-2">Filters</h1>
          </button>
        </div>

        <FilterButtons title="Price">
          <FilterPrice setMax={setMax} setMin={setMin} min={min} max={500000} />
        </FilterButtons>

        <FilterButtons title="Categories">
          {categories.map((items) => {
            return (
              <FilterCategory
                items={items}
                key={items.id}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            );
          })}
        </FilterButtons>

        <FilterButtons title="Material">
          {uniqueMaterial.map((items) => {
            return (
              <div
                className="my-5 text-xl font-light flex  gap-3 px-5"
                key={items.id}
              >
                <FilterMaterial
                  items={items}
                  selectedMaterial={selectedMaterial}
                  setSelectedMaterial={setSelectedMaterial}
                />
              </div>
            );
          })}
        </FilterButtons>

        <FilterButtons title="Size">
          {uniqueSize.map((items) => {
            return (
              <div
                className="my-5 text-xl font-light flex  gap-3 px-5"
                key={items.id}
              >
                <FilterSize
                  items={items}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
              </div>
            );
          })}
        </FilterButtons>

        <FilterButtons title="Brand">
          {brands.map((items) => {
            return (
              <div
                className="my-5 text-xl font-light flex  gap-3 px-5"
                key={items.id}
              >
                <FilterBrand
                  items={items}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                />
              </div>
            );
          })}

          <div className="my-5 text-xl font-light flex  gap-3 px-5">
            <input
              type="checkbox"
              id="all"
              className="form-checkbox w-5 accent-gray-600 "
              value="All"
              onChange={(e) => {
                if (e.target.checked) dispatch({ type: 'clearFilters' });
                else return null;
              }}
            />
            <label htmlFor={'all'}>
              All <span className="text-xs">(50)</span>
            </label>
          </div>
        </FilterButtons>
        <Sort />
      </div>
    </>
  );
}

export default ProductSidebarModal;
