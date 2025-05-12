import { useRef, useState } from 'react';
import { AnimatePresence, useInView, motion } from 'framer-motion';

import { childVariants, parentVariants } from '../../../helpers/variants';
import { Tab, TabLabel } from './Tab';
import SectionSubheading from './SectionSubheading';
import Collapse from '../../../ui/Collapse';

const featuresHeadings = [
  {
    icon: '/img/movement.svg',
    label: 'movement',
  },
  {
    icon: '/img/case.svg',
    label: 'case',
  },
  {
    icon: '/img/strap.svg',
    label: 'strap',
  },
  {
    icon: '/img/dial.svg',
    label: 'dial',
  },
];

function Specification({ movement, watchCase, strap, dial }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedTab, setSelectedTab] = useState(null);

  const specification = [movement, watchCase, strap, dial];

  const toggleTab = (index) =>
    setSelectedTab(selectedTab === index ? null : index);

  return (
    <section className="p-5 my-5 space-y-5 " ref={ref}>
      <SectionSubheading
        subheading="technical specification"
        variants={parentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      <motion.div
        className="grid lg:grid-flow-col gap-4  "
        variants={parentVariants}
        animate={isInView ? 'visible' : 'hidden'}
      >
        {featuresHeadings.map((tab, i) => {
          return (
            <Tab
              icon={tab.icon}
              label={tab.label}
              key={i}
              index={i}
              onSelect={() => toggleTab(i)}
              isActive={selectedTab === i}
              specification={specification}
              selectedTab={selectedTab}
              variants={childVariants}
            />
          );
        })}
      </motion.div>
      <AnimatePresence>
        <Collapse open={selectedTab !== null}>
          {/* {selectedTab !== null && ( */}
          <div className="hidden lg:grid grid-cols-3 gap-5 py-3">
            {specification?.at(selectedTab)?.map((data, i) => {
              return (
                <TabLabel label={data?.subheading} key={i}>
                  {data?.value}
                </TabLabel>
              );
            })}
          </div>
          {/* )} */}
        </Collapse>
      </AnimatePresence>
    </section>
  );
}

export default Specification;
