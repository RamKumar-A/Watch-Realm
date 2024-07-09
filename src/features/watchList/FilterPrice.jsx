import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterPrice } from './filterSlice';

function FilterPrice({ setMax, setMin, min, max }) {
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(filterPrice([min, max]));
    },
    [dispatch, min, max]
  );

  return (
    <div className="space-y-2 py-2">
      <h3 className="text-md font-light">Select Price Range</h3>
      <div className="flex items-center justify-between">
        <input
          type="range"
          name="minPrice"
          id="minPrice"
          min={4000}
          max={500000}
          step={1000}
          value={min}
          className=""
          onChange={(e) => setMin(parseInt(e.target.value))}
        />
        <label htmlFor="minPrice">
          <span className="text-xs">$</span>
          {min}
        </label>
      </div>

      <div className="flex items-center justify-between">
        <input
          type="range"
          name="maxPrice"
          id="maxPrice"
          step={1000}
          max={500000}
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value))}
        />
        <label htmlFor="maxPrice">
          <span className="text-xs">$</span>
          {max}
        </label>
      </div>
    </div>
  );
}

export default FilterPrice;
