import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineXMark } from 'react-icons/hi2';
import useOutsideClick from '../hooks/useOutsideClick';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const contextValue = { openName, setOpenName };
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

// Triggering component
function Trigger({ children, opens: opensWindow }) {
  const { setOpenName } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => setOpenName(opensWindow),
  });
}

// Content of the Modal
function Content({ children, name, clicks }) {
  const { openName, setOpenName } = useContext(ModalContext);

  function close() {
    setOpenName('');
  }

  const ref = useOutsideClick(close, true);
  if (name !== openName) return null;

  return createPortal(
    <div className=" w-full z-50 fixed h-full top-0 backdrop-blur-[50px] sm:left-[50%] lg:left-[75%]">
      <div
        className="text-xl h-full ml-10 sm:ml-0 relative sm:w-1/2 lg:w-1/4 pt-5 bg-gray-100 border-l-2 border-gray-900"
        ref={ref}
      >
        <button
          onClick={() => {
            close();
            clicks?.clicks((click) => {
              return !click;
            });
          }}
          className=" absolute right-0 text-xl font-bold pr-2 text-gray-900 "
        >
          {<HiOutlineXMark />}
        </button>
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body
  );
}

Modal.Trigger = Trigger;
Modal.Content = Content;

export default Modal;
