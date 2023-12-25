import { useEffect } from 'react';
import { useRef } from 'react';

function useClickOutside(callback) {
  const ref = useRef(null);

  useEffect(
    function () {
      function handleOutsideClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          callback();
        }
      }
      document.addEventListener('click', handleOutsideClick);
      return function () {
        document.removeEventListener('click', handleOutsideClick);
      };
    },
    [callback]
  );

  return ref;
}

export default useClickOutside;
