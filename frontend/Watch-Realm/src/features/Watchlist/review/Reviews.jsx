import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';
import { FaStar } from 'react-icons/fa';

import { parentVariants } from '../../../helpers/variants';

import Button from '../../../ui/Button';

function Reviews({ reviews }) {
  const ref = useRef(null);
  const [isShowMore, setIsShowMore] = useState(false);
  const isInView = useInView(ref);

  function handleShowMoreToggle() {
    setIsShowMore(!isShowMore);
  }

  return (
    <div ref={ref}>
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8"
        variants={parentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <AnimatePresence>
          {(reviews?.length > 3
            ? isShowMore
              ? reviews?.slice(0)
              : reviews?.slice(0, 3)
            : reviews
          )?.map((review, index) => (
            <motion.div
              key={index}
              className="p-5 bg-secondary-default shadow-lg rounded-lg border border-highlight-dark"
            >
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-highlight-dark">
                  <motion.img
                    src={review?.user?.photo}
                    alt={review.user?.name}
                    className="w-full h-full rounded-full p-0.5"
                    loading="lazy"
                  />
                </div>
                <motion.div>
                  <h4 className="text-lg font-semibold text-contrastText-primary">
                    {review?.user?.name}
                  </h4>
                  <div className="flex text-yellow-500">
                    {Array.from({ length: review?.rating }, (_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </motion.div>
              </div>
              <motion.p className="pt-5 text-gray-600 text-sm italic font-roboto font-light">
                "{review?.review}"
              </motion.p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {reviews?.length > 3 && (
        <div className="flex items-center justify-center p-3">
          <Button
            onClick={handleShowMoreToggle}
            className="uppercase py-2 px-3 border border-secondary-default text-md rounded-full shadow-lg bg-white"
          >
            {/* {isShowMore ? 'see less' : 'see more'} */}
            <HiChevronDown
              className={`inline ${
                isShowMore ? 'rotate-180' : ''
              } transition-transform duration-100`}
              size={20}
            />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Reviews;
