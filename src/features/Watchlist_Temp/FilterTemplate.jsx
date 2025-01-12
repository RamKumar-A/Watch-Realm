import { useSearchParams } from 'react-router-dom';

import FilterCategory from './FilterCategory';
import FilterMaterial from './FilterMaterial';
import FilterBrand from './FilterBrand';

function FilterTemplate() {
  const [searchParmas] = useSearchParams();

  const category = searchParmas.get('category')?.split(',');
  const material = searchParmas.get('material')?.split(',');
  const brand = searchParmas.get('brand')?.split(',');

  const filters = [...(category || []), ...(material || []), ...(brand || [])];

  return (
    <div>
      <div className="flex flex-wrap gap-2 text-sm p-2 opacity-85">
        {filters.map((filter) => (
          <span className="" key={filter}>
            {' '}
            {filter}
          </span>
        ))}
      </div>
      <div className=" grid gap-4 w-full p-2">
        <FilterCategory />
        <FilterMaterial />
        <FilterBrand />
      </div>
    </div>
  );
}

export default FilterTemplate;
