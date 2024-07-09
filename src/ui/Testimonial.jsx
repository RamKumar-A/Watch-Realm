import { testimonialData } from '../helpers/testimonialData';
import TestimonialDetails from './TestimonialDetails';

function Testimonial() {
  return (
    <div className="flex items-center w-full flex-wrap justify-center px-2 py-5 gap-y-6 gap-x-6 ">
      {testimonialData.map((test) => (
        <TestimonialDetails test={test} key={test.title} />
      ))}
    </div>
  );
}

export default Testimonial;
