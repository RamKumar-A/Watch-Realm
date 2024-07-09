import Sort from './Sort';
import FilterTemplate from './FilterTemplate';

function ProductSidebarModal({ watch, brands, categories, openFilters }) {
  return (
    <FilterTemplate
      openFilters={openFilters}
      // classes={`${openFilters ? 'block' : 'hidden'} p-5 w-[250px] sm:block`}
      // watch={watch}
      // brands={brands}
      // categories={categories}
    >
      <Sort />
    </FilterTemplate>
  );
}

export default ProductSidebarModal;
