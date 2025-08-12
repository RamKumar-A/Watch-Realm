import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

import { useFilter } from '../../Context/FilterContext';

const sortTypes = [
  { type: 'name', label: 'A-Z' },
  { type: '-name', label: 'Z-A' },
  { type: 'price', label: 'Price -- Low to High' },
  { type: '-price', label: 'Price -- High to Low' },
];

function Sort({ visible }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedSort, setSelectedSort } = useFilter();

  function handleSort(type) {
    searchParams.set('sort', type);
    setSelectedSort(type);
    setSearchParams(searchParams);
  }

  return (
    <div
      className={`lg:flex gap-5  ${
        visible
          ? 'flex flex-col items-start p-2 bg-secondary-default shadow-md rounded mx-2 my-3 py-4 px-4 border border-highlight-default'
          : 'hidden items-center'
      }`}
    >
      <h3 className={`${visible ? 'font-semibold' : 'font-bold text-lg'} `}>
        Sort By
      </h3>
      <div
        className={`flex gap-3 ${
          visible ? 'flex-col items-start' : 'flex-row'
        } `}
      >
        {sortTypes.map((sort) => {
          return (
            <button
              className={`${
                sort.type === selectedSort
                  ? 'text-blue-950 opacity-90'
                  : 'opacity-65'
              } relative text-md`}
              onClick={() => handleSort(sort.type)}
              key={sort.label}
            >
              {sort.type === selectedSort && (
                <motion.div
                  layoutId="active-sort-pill"
                  className="absolute w-full h-[0.5px] bottom-0 bg-accent-primary"
                />
              )}
              <span className="relative z-10 ">{sort.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Sort;
