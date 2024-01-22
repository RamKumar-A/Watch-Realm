// import { useEffect, useState } from 'react';
// import { useFilter } from './Context';

function FilterPrice({ setMax, setMin, min, max }) {
  return (
    <div className="py-3 pt-5">
      <h3 className="text-xl font-light">Select Price Range</h3>
      <div className="flexitems-center flex-col gap-2 p-3 pl-0 font-semibold">
        <div className="flex items-center gap-2 py-3">
          <input
            type="range"
            name="minPrice"
            min={0}
            max={500000}
            step={1000}
            value={min}
            className="w-24 pl-2 border rounded-lg"
            onChange={(e) => setMin(Number(e.target.value))}
          />
          <label htmlFor="minPrice">${min}</label>
        </div>

        <div className="flex items-center gap-2 py-3">
          <input
            type="range"
            name="maxPrice"
            min={0}
            max={500000}
            step={1000}
            value={max}
            className="w-24 pl-2 border rounded-lg"
            onChange={(e) => setMax(+e.target.value)}
          />
          <label htmlFor="maxPrice">${max}</label>
        </div>
      </div>
    </div>
  );
}

export default FilterPrice;
