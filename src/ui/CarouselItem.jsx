import { NavLink } from 'react-router-dom';

function CarouselItem({ carouselData, curIndex }) {
  const carouselStyles = {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${carouselData[curIndex].img})`,
  };

  return (
    <div className="h-[100%] bg-contain bg-no-repeat" style={carouselStyles}>
      <div className="p-5 sm:flex flex-col justify-center sm:w-[85%] lg:w-[60%] w-[350px] ml-5">
        <div className="mt-10 mx-3 sm:mt-[10rem] sm:ml-7 sm:mb-3 lg:ml-[10rem]">
          <h1 className="text-gray-200 font-bold py-3 text-5xl para-style">
            {carouselData[curIndex].title}
          </h1>
          <p className="text-gray-300 para-style pt-4 lg:text-xl text-[0.9rem] md:text-[1.1rem]">
            {carouselData[curIndex].description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button className=" text-gray-50 font-bold h-12 w-[100px] bg-transparent  mt-4 border-2 border-gray-500">
          <NavLink to="/shop">Shop</NavLink>
        </button>
      </div>
    </div>
  );
}

export default CarouselItem;
