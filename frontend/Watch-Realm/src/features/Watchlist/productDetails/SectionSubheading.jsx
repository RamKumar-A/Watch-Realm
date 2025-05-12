import { motion } from 'framer-motion';

function SectionSubheading({ children, subheading, className, ...props }) {
  return (
    <motion.div {...props}>
      <h1
        className={`text-2xl font-semibold text-center uppercase py-5 ${className} relative heading mb-10`}
      >
        {subheading}
      </h1>
      {children}
    </motion.div>
  );
}
export default SectionSubheading;
