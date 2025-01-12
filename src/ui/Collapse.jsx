import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
  },
  exit: { height: 0, opacity: 0 },
};

function Collapse({ open, children, duration = 0.3 }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration }}
          className="overflow-hidden"
          variants={containerVariants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Collapse;
