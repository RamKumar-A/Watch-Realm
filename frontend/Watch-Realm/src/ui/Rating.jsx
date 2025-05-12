import { useState } from 'react';

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <svg
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? '#FFD700' : '#E0E0E0'} // Gold for filled, gray for empty
    width="32px"
    height="32px"
    style={{ cursor: 'pointer' }}
  >
    <path d="M12 2.25l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 1.18-6.88-5-4.87 6.91-1z" />
  </svg>
);

const Rating = ({ value = 0, max = 5, onChange }) => {
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClick = (index) => {
    if (onChange) onChange(index + 1);
  };

  const handleMouseEnter = (index) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          filled={(hoverValue || value) > index}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default Rating;
