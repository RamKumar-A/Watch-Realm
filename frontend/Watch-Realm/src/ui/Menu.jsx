import useOutsideClick from '../hooks/useOutsideClick';

function Menu({ isOpen, anchorRef, onClose, children }) {
  const { ref } = useOutsideClick(onClose);

  return (
    isOpen && (
      <div
        ref={ref}
        className="absolute bg-secondary-default shadow-lg rounded-md w-32 overflow-hidden border border-highlight-dark z-30 p-1"
        style={{
          top: anchorRef?.current?.offsetHeight + 8, // Adjust the menu to appear below the anchor
          left: anchorRef?.current?.offsetLeft - 25, // Align with anchor
        }}
      >
        <ul className="space-y-1">{children}</ul>
      </div>
    )
  );
}

export default Menu;
