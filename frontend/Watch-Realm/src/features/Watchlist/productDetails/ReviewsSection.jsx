import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useInView, motion } from 'framer-motion';

import { childVariants, parentVariants } from '../../../helpers/variants';

import AddReview from '../review/AddReview';
import Reviews from '../review/Reviews';
import SectionSubheading from './SectionSubheading';

function ReviewsSection({ reviews }) {
  const params = useParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="my-5 py-5 px-5 lg:px-20" ref={ref}>
      <SectionSubheading
        subheading="customer reviews"
        variants={parentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.p className="text-lg text-center" variants={childVariants}>
          Hear what our customers have to say about their royal experience.
        </motion.p>
      </SectionSubheading>
      {/* Reviews Grid */}
      <div className="grid gap-5">
        <Reviews reviews={reviews} />
        {/* Add Review Section */}
        <AddReview reviews={reviews} watchId={params.pid} />
      </div>
    </section>
  );
}
export default ReviewsSection;
