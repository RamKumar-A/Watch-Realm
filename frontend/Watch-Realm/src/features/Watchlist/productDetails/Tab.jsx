import { AnimatePresence, motion } from 'framer-motion';
import { HiMinusSmall, HiPlusSmall } from 'react-icons/hi2';

import { grandchildVariants } from '../../../helpers/variants';
import Collapse from '../../../ui/Collapse';

export function TabLabel({ label, children }) {
  return (
    <div className="p-3 border-b-2 border-highlight-default text-sm ">
      <h4 className="uppercase font-bold">{label}</h4>
      <p className="brightness-200">{children}</p>
    </div>
  );
}

export function Tab({
  label,
  icon,
  onSelect,
  isActive,
  selectedTab,
  specification,
  index,
  ...props
}) {
  return (
    <>
      <motion.div
        onClick={onSelect}
        className={`col-span-1 grid place-items-center rounded-lg p-3 cursor-pointer ${
          isActive
            ? 'bg-secondary-default/50 border border-highlight-dark'
            : 'bg-secondary-default border border-highlight-default/75'
        }`}
        {...props}
      >
        {icon && (
          <motion.div variants={grandchildVariants}>
            <img src={icon} alt={label || 'image'} />
          </motion.div>
        )}
        {label && (
          <motion.div variants={grandchildVariants}>
            <h4 className="uppercase font-bold text-sm">{label}</h4>
          </motion.div>
        )}
        {isActive ? <HiMinusSmall /> : <HiPlusSmall />}
      </motion.div>
      <TabCollapse
        selectedTab={selectedTab}
        index={index}
        specification={specification}
      />
    </>
  );
}

function TabCollapse({ selectedTab, specification, index }) {
  return (
    <motion.div className="lg:hidden">
      <AnimatePresence>
        <Collapse open={selectedTab !== null && selectedTab === index}>
          <div className="py-3 w-full">
            {specification?.at(selectedTab)?.map((data, i) => {
              return (
                <TabLabel label={data?.subheading} key={i}>
                  {data?.value}
                </TabLabel>
              );
            })}
          </div>
        </Collapse>
      </AnimatePresence>
    </motion.div>
  );
}
