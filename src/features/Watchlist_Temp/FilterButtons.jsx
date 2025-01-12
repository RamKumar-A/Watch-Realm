import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';

function FilterButtons({ children, title, noMap }) {
  const [buttonToggle, setButtonToggle] = useState(false);

  return (
    <div className="">
      <button
        className="flex justify-between  items-center w-full border border-gray-300 border-l-4 border-l-gray-800 rounded bg-gray-100 p-2   "
        onClick={() => setButtonToggle(!buttonToggle)}
      >
        <span className="text-lg">{title}</span>

        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: buttonToggle ? -180 : 0 }}
        >
          <HiChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {buttonToggle && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            className="px-1.5 text-md space-y-1 origin-top "
          >
            {!noMap &&
              children.map((child, index) => (
                <motion.div
                  key={child.key || index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,

                    transition: { delay: index * 0.1 },
                  }}
                >
                  {child}
                </motion.div>
              ))}
            {noMap && children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FilterButtons;
