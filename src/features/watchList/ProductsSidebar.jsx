import FilterTemplate from './FilterTemplate';
import Sort from './Sort';

function ProductsSidebar({ openFilters }) {
  return (
    <div className="sm:px-2 ">
      <div className="hidden sm:flex items-center justify-between pb-5 px-2 ">
        <button className="text-xl font-bold">Filters</button>
        <button className="hidden text-xs bg-red-500 px-1.5 rounded text-gray-50">
          Clear All
        </button>
      </div>
      <FilterTemplate openFilters={openFilters}>
        {openFilters && <Sort />}
      </FilterTemplate>
    </div>
  );
}

export default ProductsSidebar;
