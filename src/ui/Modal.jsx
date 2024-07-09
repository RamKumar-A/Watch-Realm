import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineXMark } from 'react-icons/hi2';
import useOutsideClick from '../hooks/useOutsideClick';
import { AnimatePresence, motion } from 'framer-motion';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const contextValue = { openName, setOpenName };
  return (
    <AnimatePresence mode="wait" initial={false}>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
    </AnimatePresence>
  );
}

// Triggering component
function Trigger({ children, opens: opensWindow }) {
  const { setOpenName } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      setOpenName(opensWindow);
    },
  });
}
const containerVariants = {
  hide: {
    scale: 0,
    transition: { duration: 0.5 },
  },
  show: {
    scale: 1,
    transition: { duration: 0.2 },
  },
};
// Content of the Modal
function Content({ children, name }) {
  const { openName, setOpenName } = useContext(ModalContext);

  function close() {
    setOpenName('');
  }

  const isOpen = name === openName;

  const ref = useOutsideClick(close, true);

  if (!isOpen) return null;

  return createPortal(
    <motion.div className=" w-full z-50 fixed h-full top-0 sm:left-1/2 xl:left-3/4 backdrop-blur-xl ">
      <motion.div
        className="text-xl h-full relative w-3/4 sm:w-1/2 xl:w-1/4 left-1/4 bg-gray-100  border-gray-900 origin-right overflow-y-auto "
        ref={ref}
        variants={containerVariants}
        initial="hide"
        animate="show"
        exit="hide"
      >
        <button
          onClick={close}
          className=" absolute right-1 text-xl font-bold z-50 text-gray-900 top-3 "
        >
          {<HiOutlineXMark size={24} />}
        </button>
        {/* {cloneElement(children, { onCloseModal: close })} */}
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
}

Modal.Trigger = Trigger;
Modal.Content = Content;

export default Modal;
