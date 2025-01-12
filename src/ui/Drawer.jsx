import { motion } from 'framer-motion';

import useOutsideClick from '../hooks/useOutsideClick';

const Drawer = ({ isOpen, position = 'left', onClose, children }) => {
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
      className={`fixed ${positions[position]} bg-primary-default shadow-lg z-50 overflow-auto`}
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      variants={motionVariants}
      style={{
        width: position === 'left' || position === 'right' ? '300px' : 'auto',
        height: position === 'top' || position === 'bottom' ? '300px' : 'auto',
      }}
    >
      {children}
    </motion.div>
  );
};

export default Drawer;
