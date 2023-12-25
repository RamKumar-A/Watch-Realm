import { testimonialData } from '../helpers/testimonialData';
import TestimonialDetails from './TestimonialDetails';

function Testimonial() {
  return (
    <div className="grid lg:grid-cols-3 gap-2 p-5 lg:p-36 sm:mx-14">
      {testimonialData.map((test) => (
        <TestimonialDetails test={test} key={test.title} />
      ))}
    </div>
  );
}

export default Testimonial;
