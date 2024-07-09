import { motion } from 'framer-motion';

const containerVariants = {
  hover: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  initial: {
    x: 0,
    opacity: 1,
  },
  hover: {
    x: -2,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
    },
  },
};

function Button(
  {
    handler,
    icon,
    label,
    padding = 'p-1',
    backgroundColor = 'bg-transparent hover:bg-gray-700 ',
    otherClasses,
  },
  props
) {
  return (
    <motion.div
      className={`w-fit border border-gray-400 hover:border-gray-100 group hover:transition-all duration-200 cursor-pointer  ${padding} ${otherClasses} ${backgroundColor}
      } `}
      variants={containerVariants}
      whileHover="hover"
      initial="initial"
      whileTap={{ scale: 0.9 }}
      onClick={handler}
      {...props}
    >
      <motion.button
        className={`flex w-full items-center gap-1 text-sm border border-transparent  group-hover:border-gray-100 group-hover:transition-all group-hover:duration-500  ${padding}`}
        whileHover="hover"
        initial="initial"
      >
        {icon && (
          <motion.span className="" variants={childVariants}>
            {icon}
          </motion.span>
        )}
        <span className="group-hover:text-gray-50">{label}</span>
      </motion.button>
    </motion.div>
  );
}

export default Button;
