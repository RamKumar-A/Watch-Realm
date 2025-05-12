import { motion } from 'framer-motion';

import useOutsideClick from '../hooks/useOutsideClick';

const Drawer = ({ isOpen, position = 'left', onClose, children, classes }) => {
  const { ref } = useOutsideClick(() => onClose());

  const positions = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  const motionVariants = {
    hidden: {
      x: position === 'left' ? '-100%' : position === 'right' ? '100%' : 0,
      y: position === 'top' ? '-100%' : position === 'bottom' ? '100%' : 0,
    },
    visible: {
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`fixed ${
        positions[position]
      } bg-primary-default shadow-lg z-50 overflow-auto ${
        position === 'left' || position === 'right'
          ? 'w-[300px] md:w-[350px]'
          : 'w-auto'
      } ${
        position === 'top' || position === 'bottom' ? 'h-[300px]' : 'h-auto'
      } ${classes}`}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      variants={motionVariants}
    >
      {children}
    </motion.div>
  );
};

export default Drawer;
