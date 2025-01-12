import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

import {
  childVariants,
  grandchildVariants,
  parentVariants,
} from '../helpers/variants';

const list = [
  {
    subtitle: 'Certified Authenticity',
    description:
      '100% genuine luxury timepieces with a certificate of authenticity.',
  },
  {
    subtitle: 'Luxury Redefined',
    description:
      'A curated selection of the finest brands, from Rolex to Patek Philippe.',
  },
  {
    subtitle: 'Seamless Shopping',
    description:
      'Premium customer service and secure, effortless transactions.',
  },
  {
    subtitle: 'Exclusive Deals',
    description: 'Unlock special offers on high-end watches.',
  },
];

function HightLightSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="mx-5 md:mx-14 ">
      <div
        className="grid md:grid-cols-2 justify-items-center place-items-center"
        ref={ref}
      >
        <motion.div
          className="space-y-5"
          variants={parentVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h1
            variants={childVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold py-5 text-center md:text-left  "
          >
            <motion.span
              className=" drop-shadow "
              variants={grandchildVariants}
            >
              Highlights
            </motion.span>
          </motion.h1>
          <motion.h3
            variants={childVariants}
            className="text-lg md:text-xl lg:text-2xl "
          >
            Why Choose Watch Realm?
          </motion.h3>
          <motion.ul
            variants={childVariants}
            className="lg:list-disc text-sm md:text-md space-y-2"
          >
            {list.map((item, index) => (
              <motion.li className="" key={index} variants={grandchildVariants}>
                <span className="font-semibold ">{item.subtitle}: </span>
                {item.description}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        <motion.div
          className="w-full h-[25rem] sm:h-[30rem] md:h-[25rem] lg:h-[30rem] p-2"
          initial={{ x: 300, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 300, opacity: 0 }}
          transition={{ duration: 0.5, type: 'tween' }}
        >
          <img
            className="w-full h-full object-contain drop-shadow-lg md:drop-shadow-xl lg:drop-shadow-3xl xl:drop-shadow-4xl "
            src="https://res.cloudinary.com/dc3yfknua/image/upload/v1732718318/collection-4_xhkwiz.jpg"
            alt="highlights"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default HightLightSection;
