import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import {
  childHeadingVariants,
  containerHeadingVariants,
} from '../helpers/variants';

import Aboutus from '../ui/Aboutus';

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-5 space-y-5 px-2" ref={ref}>
      <motion.div
        className="flex flex-col items-center justify-center space-y-3 py-5"
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerHeadingVariants}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-center text-3xl md:text-5xl  font-semibold tracking-wide drop-shadow-md "
          variants={childHeadingVariants}
        >
          About Watch{' '}
          <span className="text-contrastText-primary/40 ">Realm</span>
        </motion.h1>
        <motion.div
          className="md:w-3/4 text-center space-y-2 text-sm sm:text-md md:text-base"
          variants={childHeadingVariants}
          transition={{ duration: 0.8 }}
        >
          <p className="">
            Welcome to Watch Realm, the ultimate destination for luxury
            timepieces. We believe a watch is more than just an accessory - it's
            a statement, a reflection of personality, and a mark of timeless
            elegance.
          </p>
          <p className="">
            At Watch Realm, we curate an exclusive collection of high-end
            wristwatches crafted by the most renowned brands in the world. From
            classic designs to modern innovations, each piece is a masterpiece
            of craftsmanship and precision.
          </p>
        </motion.div>
      </motion.div>
      <Aboutus />
    </section>
  );
}

export default About;
