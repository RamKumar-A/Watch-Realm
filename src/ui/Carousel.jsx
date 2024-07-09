import { useState } from 'react';
import { carouselData } from '../helpers/carouselData';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Button from './Button';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
const variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

function Carousel() {
  const [curIndex, setCurIndex] = useState(0);
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
    <div className="w-full h-screen sm:h-[650px] my-0 mx-auto ">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="bg-no-repeat h-full pb-16 justify-start flex items-center relative "
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, staggerChildren: 0.1 }}
          key={carouselData[curIndex].title}
        >
          <div className="absolute -z-10 w-full h-full">
            <img
              src={carouselData[curIndex].img}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="mx-auto sm:mx-20 font-nunito md:w-1/2 p-5 "
            // initial={{ y: -10 }}
            // animate={{ y: 10,  }}
          >
            <h1 className="text-gray-200 font-bold py-3 text-4xl md:text-5xl  ">
              {carouselData[curIndex].title}
            </h1>
            <p className="text-gray-300 pt-4 lg:text-xl text-[0.9rem] md:text-md">
              {carouselData[curIndex].description}
            </p>
          </div>
          <div className="absolute w-full flex items-center justify-between top-3/4 sm:top-[60%] px-2 py-3  ">
            <Button
              label={<HiArrowLeft size={19} />}
              handler={handlePrevSlide}
              otherClasses="text-gray-50"
              padding="p-2"
            />
            <NavLink to="/shop">
              <Button
                label={<span className="text-[1.1rem]">Shop</span>}
                padding="px-2 py-2"
                otherClasses="text-gray-50 text-xl "
              />
            </NavLink>
            <Button
              label={<HiArrowRight size={19} />}
              handler={handleNextSlide}
              otherClasses="text-gray-50"
              padding="p-2"
            />
          </div>
        </motion.div>
        {/* </div> */}
      </AnimatePresence>
    </div>
  );
}

export default Carousel;
