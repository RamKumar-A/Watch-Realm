import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { HiOutlineTruck } from 'react-icons/hi2';

import {
  childVariants,
  grandchildVariants,
  parentVariants,
} from '../../../helpers/variants';

function ProductDetailsFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      className=" py-5 text-sm font-bold text-accent-primary my-5"
      ref={ref}
    >
      {/* free delivery */}
      <motion.div
        className="grid md:grid-flow-col place-items-center gap-2"
        variants={parentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="w-44 uppercase grid place-items-center text-center"
          variants={childVariants}
        >
          <HiOutlineTruck size={40} />
          <motion.span variants={grandchildVariants}>
            free delivery & return
          </motion.span>
        </motion.div>
        <motion.div
          className="h-[0.5px] w-1/4 md:h-14 md:w-[1px] bg-accent-primary"
          variants={grandchildVariants}
        />
        {/* authentic watches */}
        <motion.div
          className="w-44 uppercase grid place-items-center text-center"
          variants={childVariants}
        >
          <AiOutlineFileProtect size={40} />
          <motion.span variants={grandchildVariants}>
            authentic and certified watches
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ProductDetailsFooter;
