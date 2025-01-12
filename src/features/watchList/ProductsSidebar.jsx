import FilterTemplate from './FilterTemplate';

function ProductsSidebar() {
  return (
    <div className="sm:px-2 space-y-5">
      <div className="hidden sm:flex items-center justify-between px-2 ">
        <h1 className="text-lg font-bold">Filters</h1>
      </div>

      <FilterTemplate />
    </div>
  );
}

export default ProductsSidebar;
