import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

import {
  childHeadingVariants,
  containerHeadingVariants,
} from '../helpers/variants';

import FeaturedCollection from '../ui/FeaturedCollection';
import HightLightSection from '../ui/HightLightSection';
import Carousel from '../ui/Carousel';
import Button from '../ui/Button';

function Home() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-5 space-y-5" ref={ref}>
      <motion.div
        className="text-center p-2 sm:p-4 space-y-2  "
        variants={containerHeadingVariants}
        initial={'hidden'}
        animate={isInView ? 'visible' : 'hidden'}
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h1
          className="text-xl md:text-3xl lg:text-5xl font-semibold drop-shadow "
          variants={childHeadingVariants}
        >
          {/* "Timeless Elegance, Curated for You" */}
          Timeless Elegance, Curated for You
        </motion.h1>
        <motion.p
          className="hidden md:block md:text-md "
          variants={childHeadingVariants}
        >
          Explore the world's most iconic luxury wristwatches in one place.
        </motion.p>
      </motion.div>
      <Carousel />
      <FeaturedCollection />
      <HightLightSection />

      <motion.div
        variants={containerHeadingVariants}
        initial="hidden"
        whileInView={'visible'}
        transition={{ duration: 2 }}
        className="text-center space-y-6 py-4"
      >
        <motion.h1
          variants={childHeadingVariants}
          className="text-2xl font-semibold"
        >
          Ready to Find Your Perfect Timepiece?
        </motion.h1>
        <Button
          variant="primary"
          rounded="small"
          onClick={() => navigate('/shop')}
        >
          <span className="">Shop Luxury Watches</span>
        </Button>
      </motion.div>
    </section>
  );
}

export default Home;
