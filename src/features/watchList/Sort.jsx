import { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import useClickOutside from '../../hooks/useOutsideClick';
import { motion, AnimatePresence } from 'framer-motion';
import { sortBy } from './filterSlice';
import { useDispatch } from 'react-redux';
const sortTypes = [
  { type: 'ascending', label: 'A-Z' },
  { type: 'descending', label: 'Z-A' },
  { type: 'high-low', label: 'High-Low' },
  { type: 'low-high', label: 'Low-High' },
];
function Sort() {
  const [toggleSort, setToggleSort] = useState(false);
  const [sortType, setSortType] = useState('ascending');
  const dispatch = useDispatch();
  // const { dispatch } = useFilter();

  const ref = useClickOutside(() => setToggleSort(false));

  function handleToggleSort() {
    setToggleSort(!toggleSort);
  }

  useEffect(
    function () {
      dispatch(sortBy(sortType));
    },
    [dispatch, sortType]
  );

  function handleSortType(type) {
    setSortType(type);
    setToggleSort(false);
  }

  return (
    <div ref={ref} className="">
      <div className="cursor-pointer overflow-y-auto ">
        <div className="flex flex-wrap items-center relative gap-2">
          <h1
            className="text-lg flex items-center font-bold gap-1"
            onClick={handleToggleSort}
          >
            Sort by
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: toggleSort ? -180 : 0 }}
            >
              <HiChevronDown size={14} className="font-bold" />
            </motion.span>
          </h1>
          <span className="w-40 text-[0.8rem] font-medium px-2 border border-gray-950 rounded ">
            {sortType}
          </span>
        </div>
        <AnimatePresence initial={false}>
          {toggleSort && (
            <motion.section
              className="absolute origin-top  bg-gray-200 p-1 w-40 sm:w-32 z-20 space-y-1 rounded-md my-1 "
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { delayChildren: 0.2 },
              }}
              exit={{ scale: 0, opacity: 0 }}
            >
              {sortTypes.map((item, i) => (
                <Options
                  handler={() => handleSortType(item.type)}
                  key={item.label}
                  index={i}
                >
                  {item.label}
                </Options>
              ))}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Options({ children, handler, index }) {
  return (
    <motion.div
      className="border p-0.5 text-normal sm:p-1 rounded bg-gray-50"
      onClick={handler}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: index * 0.1 } }}
    >
      {children}
    </motion.div>
  );
}

export default Sort;
