import FilterTemplate from '../FilterTemplate';
import Sort from '../Sort';

function MobileFilters() {
  return (
    <div className="px-1">
      <FilterTemplate />
      <Sort visible />
    </div>
  );
}

export default MobileFilters;
