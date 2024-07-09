import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { motion } from 'framer-motion';

// const containerVariants = {
//   hover: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const childVariants = {
//   initial: {
//     x: 0,
//     opacity: 1,
//   },
//   hover: {
//     x: -2,
//     opacity: 1,
//     transition: {
//       type: 'spring',
//       stiffness: 300,
//     },
//   },
// };

function TestimonialDetails({ test }) {
  const navigate = useNavigate();
  return (
    <motion.div className="bg-gray-200 shadow-lg shadow-gray-500/30 rounded-sm ">
      <div className="relative group p-3">
        <img
          src={test.img}
          alt={test.title}
          className="aspect-square w-full object-cover rounded-sm "
        />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 -z-10 group-hover:z-10">
          <Button
            padding="p-2"
            backgroundColor="bg-gray-900 hover:bg-gray-500"
            handler={() => navigate('/shop')}
            label="View All"
          />
        </motion.div>
      </div>
      <div className="p-5 text-center ">
        <p className="text-[16px] text-gray-500 testimonial-head">
          {test.subTitle}
        </p>
        <p className="text-[20px] font-semibold pt-3 ">{test.title}</p>
      </div>
    </motion.div>
  );
}

export default TestimonialDetails;
