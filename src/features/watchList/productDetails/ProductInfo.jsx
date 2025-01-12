import { motion } from 'framer-motion';

import { childVariants, grandchildVariants } from '../../../helpers/variants';

function ProductInfo({
  model,
  name,
  tag,
  material,
  size,
  description,
  price,
  discountPercentage,
}) {
  return (
    <motion.div
      className="text-left text-sm p-3 space-y-3"
      variants={childVariants}
    >
      <motion.div className="space-y-1" variants={grandchildVariants}>
        <p className=" capitalize"> {model} model</p>
        <h2 className="font-bold md:font-extrabold uppercase text-2xl md:text-3xl lg:text-4xl">
          {name}
        </h2>
        <p className="">{tag}</p>
      </motion.div>
      <motion.p
        className=" capitalize brightness-200"
        variants={grandchildVariants}
      >
        {material}, {size}
      </motion.p>
      <motion.p
        className="brightness-200 py-2 text-sm"
        variants={grandchildVariants}
      >
        {description}
      </motion.p>
      <motion.div
        className="flex items-center gap-2 "
        variants={grandchildVariants}
      >
        <h3 className="text-2xl font-semibold">₹{price}</h3>
        <span className="text-xs line-through">
          ₹{Math.round(price * (discountPercentage / 100) + price)}
        </span>
        <span className=" bg-green-600 px-1.5 py-0.5 text-xs text-white rounded-2xl">
          {discountPercentage}% off
        </span>
      </motion.div>
    </motion.div>
  );
}

export default ProductInfo;
