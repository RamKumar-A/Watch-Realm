import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import {
  childVariants,
  grandchildVariants,
  parentVariants,
} from '../helpers/variants';

import Button from './Button';

function Aboutus() {
  return (
    <div className="space-y-3">
      <div className="grid lg:grid-cols-2 place-items-center lg:py-4 py-2 gap-5">
        <VisionAndMission
          order={1}
          title="vision"
          imgUrl="https://res.cloudinary.com/dc3yfknua/image/upload/v1732700684/single-post-4-1_wyjvza.jpg"
        >
          Our vision is to make quality timepieces accessible to everyone. We
          aim to curate a diverse collection of wristwatches that cater to
          various preferences, from classic to contemporary, sporty to
          sophisticated, and everything in between. We want to be your go-to
          destination for finding the perfect watch for every occasion.
        </VisionAndMission>
        <VisionAndMission
          title="mission"
          imgUrl="https://res.cloudinary.com/dc3yfknua/image/upload/v1732637272/watch-realm-watches/dxhqbbmrdy9sbjnmjqj6.jpg"
        >
          To make luxury accessible by bringing a world-class selection of
          timepieces to your fingertips. We are committed to providing
          exceptional service, authentic products, and a seamless shopping
          experience to every customer.
        </VisionAndMission>
      </div>

      <WhyChooseUs />
      <Collection />
      <JoinOurJourney />
    </div>
  );
}

function JoinOurJourney() {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className="flex items-center justify-center flex-col text-center py-5"
      ref={ref}
    >
      <motion.h1
        className="capitalize text-4xl md:text-5xl py-2 "
        variants={grandchildVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        Join Our Journey
      </motion.h1>
      <motion.div
        className="md:w-1/2 border border-highlight-dark p-8 rounded-lg shadow-md "
        variants={childVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.p variants={grandchildVariants}>
          We're more than a marketplace - we're a community of watch enthusiasts
          who appreciate the artistry and history behind each timepiece. Join us
          as we celebrate the timeless appeal of luxury watches.
        </motion.p>
        <motion.p variants={grandchildVariants}>
          Follow us on [
          <FaInstagram className="inline" />
          <FaFacebookF className="inline" />
          <FaXTwitter className="inline" />] to stay updated on new arrivals,
          exclusive offers, and expert insights into the world of fine
          watchmaking.
        </motion.p>
      </motion.div>
    </div>
  );
}

function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      id="why-choose-us"
      className="flex items-center max-md:flex-wrap max-md:justify-center gap-8 md:py-5 py-2"
      ref={ref}
    >
      <motion.div
        className="h-[20rem] lg:h-[25rem] md:w-1/2"
        initial={{ x: -300, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -300, opacity: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <img
          src="https://res.cloudinary.com/dc3yfknua/image/upload/v1732636504/watch-realm-watches/kj3akpss5qrae19n3kne.jpg"
          alt="why-choose-us"
          className="h-full w-full rounded shadow-md object-cover"
        />
      </motion.div>
      <motion.div
        className="space-y-3 md:w-1/2 max-md:mx-3"
        variants={parentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h1
          className="text-3xl md:text-4xl max-md:text-center py-2 capitalize"
          variants={childVariants}
        >
          Why choose us?
        </motion.h1>
        <motion.ul className="space-y-3 py-2" variants={childVariants}>
          <ListItems subtitle="Curated Luxury:">
            Explore a handpicked collection featuring the finest luxury brands.
          </ListItems>
          <ListItems subtitle="Authenticity Guaranteed:">
            Every watch we sell comes with a certificate of authenticity and
            warranty.
          </ListItems>
          {/* <ListItems subtitle="Exceptional Service:">
            Our team is dedicated to ensuring your shopping experience is as
            timeless as the watches we offer.
          </ListItems> */}
          <ListItems subtitle="Secure Shopping:">
            Shop with confidence on our secure platform, designed for
            hassle-free purchases.
          </ListItems>
        </motion.ul>
        <motion.div className="py-1 md:py-3 flex items-center justify-center lg:justify-start">
          <Button className="" rounded="full" variants={childVariants}>
            Explore products
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Collection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      id="collection"
      className="flex max-md:flex-wrap max-md:justify-center items-center gap-8 md:py-5 py-2 "
      ref={ref}
    >
      <motion.div
        className="space-y-3 max-md:order-2 md:w-1/2 max-md:mx-3"
        variants={parentVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h1
          className="text-3xl md:text-4xl py-2 capitalize max-md:text-center"
          variants={childVariants}
        >
          Our Collection
        </motion.h1>
        <motion.p
          variants={childVariants}
          className="text-md lg:text-base max-md:text-justify"
        >
          Discover iconic pieces from heritage brands like Rolex, Omega, Tag
          Heuer, Patek Philippe, Audemars Piguet, and more. Whether you’re
          seeking a statement piece for special occasions or a versatile design
          for everyday wear, our collection is designed to suit the most refined
          tastes.
        </motion.p>
        <motion.div
          className="py-3 flex items-center justify-center lg:justify-start"
          variants={childVariants}
        >
          <Button rounded="full">Explore products</Button>
        </motion.div>
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={parentVariants}
        transition={{ duration: 0.8, type: 'spring' }}
        className="h-[20rem] lg:h-[25rem]  md:w-1/2 max-md:order-1"
      >
        <img
          src="https://res.cloudinary.com/dc3yfknua/image/upload/v1732636235/watch-realm-watches/qkjd0tdc2crhb2ppy0vd.jpg"
          alt="collection"
          className="rounded shadow-md w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}

function ListItems({ subtitle, children, ...props }) {
  return (
    <motion.li className="space-x-2" variants={grandchildVariants} {...props}>
      <HiOutlineCheckCircle
        className="inline text-green-500 rounded-full"
        size={22}
      />
      <span className="font-semibold ">{subtitle} </span>
      <span className="text-sm lg:text-base">{children}</span>
    </motion.li>
  );
}

function VisionAndMission({ imgUrl, title, children, order }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariant = {
    hidden: { x: order === 1 ? -200 : 200, opacity: 0 },
    visible: isInView ? { x: 0, opacity: 1 } : { x: order === 1 ? -200 : 200 },
  };
  const childVariant = {
    hidden: {
      scale: 0,
      x: order === 1 ? -200 : 200,
      opacity: 0,
    },
    visible: isInView
      ? { scale: 1, x: 0, opacity: 1 }
      : { x: order === 1 ? -200 : 200, scale: 0 },
  };

  return (
    <motion.div
      className={`h-[20rem] rounded-3xl bg-no-repeat bg-cover bg-center `}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={containerVariant}
      transition={{ duration: 0.4, type: 'spring' }}
    >
      <div className="backdrop-brightness-[0.3] h-full flex justify-center flex-col rounded-3xl ">
        <motion.h1
          className="capitalize text-3xl font-extrabold tracking-wide p-3  "
          variants={childVariant}
        >
          <span className="text-contrastText-secondary/30">OUR </span>
          <span className="text-contrastText-secondary/80 capitalize">
            {title}
          </span>
        </motion.h1>
        <motion.p
          className=" text-md  text-center p-2 font-nunito text-accent-secondary"
          variants={childVariant}
        >
          {children}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Aboutus;
