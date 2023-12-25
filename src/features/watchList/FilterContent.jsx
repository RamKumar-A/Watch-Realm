// import { useEffect, useState } from 'react';
// import { useFilter } from './Context';

function FilterContent({ id, name }) {
  function handleChange(e) {
    // const { id, checked } = e.target;
  }
  return (
    <div className="my-5 text-xl font-light flex gap-3 px-5">
      <input
        type="checkbox"
        id={id}
        className="form-checkbox w-5 accent-gray-600 "
        value={name}
        checked={true}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor={id}>
        {name} <span className="text-xs">(50)</span>
      </label>
    </div>
  );
}

export default FilterContent;
