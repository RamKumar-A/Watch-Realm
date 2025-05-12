import { motion, AnimatePresence } from 'framer-motion';

import useOutsideClick from '../hooks/useOutsideClick';
import Button from './Button';
import { HiX } from 'react-icons/hi';

const Dialog = ({ open, onClose, children, title }) => {
  const { ref } = useOutsideClick(() => onClose(), true);

  return (
    <AnimatePresence>
      {open && (
        <div>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 top-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          ></motion.div>

          {/* Dialog Content */}
          <motion.div
            className="fixed z-50 inset-0 flex items-center justify-center p-2 md:p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-secondary-light rounded-lg shadow-lg w-full max-w-md overflow-hidden"
              ref={ref}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-highlight-dark flex justify-between items-center">
                <h2 className="text-lg font-semibold ">{title}</h2>
                <Button
                  onClick={onClose}
                  className="focus:outline-none"
                  size="small"
                  variant="primary"
                >
                  <HiX />
                </Button>
              </div>

              {/* Content */}
              <div className="px-4 md:px-6 py-4">{children}</div>

              {/* Actions (Optional) */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
