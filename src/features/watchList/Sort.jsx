import { useEffect, useState } from 'react';
import { useFilter } from './Context';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import useClickOutside from '../../hooks/useOutsideClick';

function Sort() {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState('ascending');
  const { dispatch } = useFilter();

  function handleToggle() {
    setToggle(!toggle);
  }

  const ref = useClickOutside(() => setToggle(false));

  useEffect(
    function () {
      if (value === 'ascending' || value === 'descending') {
        dispatch({ type: 'sortByName', payload: value });
      }
      if (value === 'high-low' || value === 'low-high') {
        dispatch({ type: 'sortByPrice', payload: value });
      }
      if (value === 'removeAll') dispatch({ type: 'removeSort' });
    },
    [dispatch, value]
  );

  return (
    <div ref={ref}>
      <div className="cursor-pointer">
        <div className="p-5">
          <h1
            className="text-xl flex items-center gap-2 font-semibold"
            onClick={handleToggle}
          >
            Sort By
            <span className="font-bold">
              {toggle ? <HiChevronUp /> : <HiChevronDown />}
            </span>
          </h1>
        </div>
        <select
          className={`${
            !toggle && 'hidden'
          } absolute border border-gray-900 h-14 w-fit text-lg font-light cursor-pointer bg-gray-300 text-gray-950 px-3`}
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
          <option value="high-low">High-Low</option>
          <option value="low-high">Low-High</option>
          <option value="removeAll">Remove Sorts</option>
        </select>
      </div>
    </div>
  );
}

export default Sort;
