import { useNavigate } from 'react-router-dom';

function TestimonialDetails({ test }) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto relative group">
      <div className="group-hover:opacity-30 ">
        <img src={test.img} alt={test.title} className={` mx-auto  `} />
      </div>
      <div className="p-5 text-center ">
        <p className="text-[16px] text-gray-500 testimonial-head">
          {test.subTitle}
        </p>
        <p className="text-[20px] font-semibold pt-3">{test.title}</p>
      </div>

      <div
        className={`bg-gray-600 
         absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 text-2xl cursor-pointer hidden group-hover:block border-4 border-gray-200 parent `}
        onClick={() => navigate('/shop')}
      >
        <p
          className={`bg-gray-600 border-gray-100 text-gray-100 
           p-2 border-2 border-transparent hover:text-gray-900 hover:bg-gray-300`}
        >
          View All
        </p>
      </div>
    </div>
  );
}

export default TestimonialDetails;
