import { HiOutlineChevronRight } from 'react-icons/hi2';

function FilterTitle({ onClick, children, isOpen }) {
  return (
    <div className=" flex items-center justify-between py-1 " onClick={onClick}>
      <h1 className="font-semibold">{children}</h1>
      <HiOutlineChevronRight
        className={`${
          isOpen ? 'rotate-90' : 'rotate-0'
        } transition-all duration-300`}
      />
    </div>
  );
}

export default FilterTitle;
