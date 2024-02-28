import { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

function FilterButtons({ children, title }) {
  return <FilterButtonsContainer children={children} title={title} />;
}

function FilterButtonsContainer({ children, title }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="flex justify-between text-xl items-center border-l-8 border-gray-950 w-full bg-gray-300 h-10"
        onClick={() => setToggle((toggle) => !toggle)}
      >
        <h1 className="pl-2">{title}</h1>
        <h1 className="pr-2">{toggle ? <HiChevronUp /> : <HiChevronDown />}</h1>
      </button>
      {toggle && children}
    </div>
  );
}

export default FilterButtons;
