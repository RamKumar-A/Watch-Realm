import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TestimonialDetails({ test }) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="mx-auto relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="hover:opacity-30 ">
        <img src={test.img} alt={test.title} className={` mx-auto  `} />
      </div>
      <div className="p-5 text-center ">
        <p className="text-[16px] text-gray-500 testimonial-head">
          {test.subTitle}
        </p>
        <p className="text-[20px] font-semibold pt-3">{test.title}</p>
      </div>

      <div
        className={`${
          isHover ? 'bg-gray-600 transition-all duration-500' : 'hidden'
        } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 text-2xl bg-gray-800 hover:transition-all duration-500 cursor-pointer`}
        onClick={() => navigate('/shop')}
      >
        <p
          className={`${
            isHover &&
            'bg-gray-600 border-gray-100 text-gray-100 transition-all duration-100'
          } p-2 border-2 border-transparent `}
        >
          View All
        </p>
      </div>
    </div>
  );
}

export default TestimonialDetails;
