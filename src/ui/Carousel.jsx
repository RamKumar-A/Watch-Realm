import { useState } from 'react';
import { carouselData } from '../helpers/carouselData';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import CarouselItem from './CarouselItem';

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
    <div className="w-full h-[500px] sm:h-[650px] my-0 mx-auto z-10">
      <div className="h-[100%] sm:h-[640px] relative z-10">
        <div
          className="absolute z-10 sm:top-1/2 top-3/4 left-1 translte-x-1/2 text-gray-900 p-2 cursor-pointer border border-gray-200 parent"
          onClick={handlePrevSlide}
        >
          <HiArrowLeft className="text-gray-300 w-8 h-8 z-10 p-1 child " />
        </div>

        <CarouselItem curIndex={curIndex} carouselData={carouselData} />

        <div
          className="absolute sm:top-1/2 top-3/4 right-[-.8rem] text-gray-900 z-10 -translate-x-1/2 p-2 cursor-pointer border border-gray-200 parent"
          onClick={handleNextSlide}
        >
          <HiArrowRight className="text-gray-300 z-10 w-8 h-8 p-1 child" />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
