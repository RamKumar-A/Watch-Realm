import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

import Button from './Button';

const carouselData = [
  {
    headline: 'Discover Luxury That Defines Time',
    subheadline:
      'Browse our exclusive collection of premium wristwatches, crafted to perfection by the world’s finest brands.',
    img: 'https://res.cloudinary.com/dc3yfknua/image/upload/v1732716121/slider1_aoh1dp.webp',
  },
  {
    headline: 'Luxury Beyond Time',
    subheadline:
      'Indulge in luxury timepieces from renowned brands, each a masterpiece of engineering and aesthetics. Elevate your wrist to new levels of sophistication.',
    img: 'https://res.cloudinary.com/dc3yfknua/image/upload/v1732716140/slider2_bqltva.webp',
  },
];

const variants = {
  initial: { opacity: 0.2, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0.2, scale: 0.95 },
};

const childContainerVariant = {
  initial: { scale: 0.8 },
  animate: { scale: 1 },
  exit: { scale: 0.8 },
};

const childVariant = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

function Carousel() {
  const [curIndex, setCurIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const maxLength = carouselData.length;

  function handlePrevSlide() {
    const newIndex = curIndex === 0 ? maxLength - 1 : curIndex - 1;
    setCurIndex(newIndex);
  }

  function handleNextSlide() {
    const newIndex = curIndex === maxLength - 1 ? 0 : curIndex + 1;
    setCurIndex(newIndex);
  }

  return (
    <motion.div
      className="w-full h-screen sm:h-[650px] my-0 mx-auto origin-left "
      ref={ref}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="bg-no-repeat h-full pb-16 justify-start flex items-center relative  "
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.1, staggerChildren: 0.1 }}
          key={carouselData[curIndex].headline}
          style={{
            backgroundImage: `url(${carouselData[curIndex].img})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Mask
            position="top-0 left-0 origin-top"
            isInView={isInView}
            childVariant={childVariant}
          />
          <Mask
            position="top-0 right-0 origin-right"
            isInView={isInView}
            childVariant={childVariant}
          />
          <Mask
            position="bottom-0 left-0 origin-left"
            isInView={isInView}
            childVariant={childVariant}
          />
          <Mask
            position="bottom-0 right-0 origin-bottom"
            isInView={isInView}
            childVariant={childVariant}
          />

          <motion.div
            className="mx-auto sm:mx-20 font-nunito md:w-1/2 p-5 "
            variants={childContainerVariant}
            // transition={{ duration: 0.4 }}
          >
            <h1 className=" font-bold py-3 text-4xl text-white">
              {carouselData[curIndex].headline}
            </h1>
            <p className=" pt-4 lg:text-lg text-[0.9rem] md:text-md text-white/70">
              {carouselData[curIndex].subheadline}
            </p>
          </motion.div>
          <motion.div
            className="absolute w-full flex items-center justify-between top-3/4 sm:top-[60%] px-2 py-3  "
            variants={{
              visible: {
                opacity: 1,
                transition: {
                  when: 'beforeChildren',
                  staggerChildren: 0.02, // Stagger children by .02 seconds
                },
              },
              hidden: {
                opacity: 0,
                transition: {
                  when: 'afterChildren',
                },
              },
            }}
            animate={isInView ? 'visible' : 'hidden'}
            initial="hidden"
          >
            <Button variant="secondary" size="medium" onClick={handlePrevSlide}>
              <HiArrowLeft size={19} />
            </Button>
            <NavLink to="/shop">
              <Button variant="secondary" size="medium">
                <span>Shop</span>
              </Button>
            </NavLink>
            <Button variant="secondary" size="medium" onClick={handleNextSlide}>
              <HiArrowRight size={19} />
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function Mask({ position, isInView, childVariant }) {
  return (
    <motion.div
      initial="visible"
      animate={isInView ? 'hidden' : 'visible'}
      transition={{ duration: 0.8 }}
      variants={childVariant}
      className={`absolute w-1/2 h-1/2 bg-secondary-default/20  ${position}`}
    />
  );
}

export default Carousel;
