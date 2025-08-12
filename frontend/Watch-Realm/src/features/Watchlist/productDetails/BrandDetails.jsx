import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

import {
  childVariants,
  grandchildVariants,
  parentVariants,
} from '../../../helpers/variants';

import SectionSubheading from './SectionSubheading';

function BrandDetails({ brand }) {
  const { brand: brandName, description, tag, brandLogo } = brand || {};
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="my-5 p-5 lg:px-20 " ref={ref}>
      <SectionSubheading
        subheading={'Brand Details'}
        variants={parentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      />

      <motion.div
        className="grid md:grid-cols-2 place-items-center"
        variants={parentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="w-40 h-40 md:w-72 md:h-72 lg:w-80 lg:h-80 border border-highlight-dark bg-primary-default rounded p-1 md:p-4 "
          variants={childVariants}
        >
          <motion.img
            variants={grandchildVariants}
            className="w-full h-full object-contain"
            src={brandLogo}
            alt={brandName}
            loading="lazy"
          />
        </motion.div>
        <motion.div className="space-y-2 py-2 " variants={childVariants}>
          <motion.h2
            className="uppercase font-bold md:font-extrabold text-2xl py-2 max-md:text-center"
            variants={grandchildVariants}
          >
            {brandName}
          </motion.h2>
          <motion.h5
            className="capitalize font-medium md:font-semibold text-lg max-md:text-center"
            variants={grandchildVariants}
          >
            {tag}
          </motion.h5>
          <motion.p
            className=" py-3 max-md:text-sm"
            variants={grandchildVariants}
          >
            {description}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default BrandDetails;
