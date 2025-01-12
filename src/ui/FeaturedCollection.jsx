import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import {
  childVariants,
  grandchildVariants,
  parentVariants,
} from '../helpers/variants';

const list = [
  {
    subtitle: 'Heritage Classics',
    description: 'Iconic designs that never go out of style.',
  },
  {
    subtitle: 'Modern Luxury',
    description: 'Cutting-edge designs with timeless sophistication.',
  },
  {
    subtitle: 'Limited Editions',
    description: 'Rare, exclusive timepieces for true collectors.',
  },
  {
    subtitle: 'Sports & Performance',
    description: 'Watches engineered for precision and durability.',
  },
];

function FeaturedCollection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="mx-5 md:mx-14">
      <div
        className="grid md:grid-cols-2 justify-items-center place-items-center"
        ref={ref}
      >
        <motion.div
          className="w-full h-[25rem] sm:h-[30rem] md:h-[25rem] lg:h-[30rem] p-2 "
          initial={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5, type: 'tween' }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -300, opacity: 0 }}
        >
          <img
            className="w-full h-full object-contain drop-shadow-lg md:drop-shadow-xl lg:drop-shadow-3xl xl:drop-shadow-4xl "
            src="https://res.cloudinary.com/dc3yfknua/image/upload/v1732701262/Mask-group-33-1_puuwow_c_pad_w_450_lf6qmx.jpg"
            alt="collection"
          />
        </motion.div>
        <motion.div
          className="space-y-5"
          // className="justify-self-start place-self-center space-y-5"
          variants={parentVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h1
            // variants={childVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold py-5 text-center md:text-left"
          >
            {['Featured ', 'Collection'].map((word, index) => {
              return (
                <motion.span
                  className="drop-shadow"
                  variants={grandchildVariants}
                  key={index}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h1>
          <motion.h3
            variants={childVariants}
            className="text-lg md:text-xl lg:text-2xl "
          >
            Explore our timeless collection
          </motion.h3>
          <motion.ul
            variants={childVariants}
            className="lg:list-disc text-sm md:text-md space-y-2"
          >
            {list.map((item, index) => (
              <motion.li
                key={index}
                variants={grandchildVariants}
                className=" "
              >
                <span className="font-semibold ">{item.subtitle}: </span>
                {item.description}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
}

export default FeaturedCollection;
