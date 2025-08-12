import { motion } from 'framer-motion';
// import { PropTypes } from 'prop-types';

const firstTextVariant = {
  initial: {
    y: 0,
  },
  hover: {
    y: -30,
    transition: {
      duration: 1.125,
      ease: [0.19, 1, 0.22, 1],
    },
  },
  animate: {
    y: 0,
    transition: {
      duration: 1.125,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const secondTextVariant = {
  initial: {
    y: 30,
  },
  hover: {
    y: 0,
    transition: {
      duration: 1.125,
      ease: [0.19, 1, 0.22, 1],
    },
  },
  animate: {
    y: 30,
    transition: {
      duration: 1.125,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  rounded = 'xs',
  animation = true,
  ...props
}) {
  const baseStyles = 'font-medium overflow-hidden ';

  const variantStyles = {
    primary: 'bg-accent-primary text-white hover:brightness-110 border',
    secondary: 'bg-secondary-dark text-black hover:bg-secondary-light',
    danger: 'bg-red-600 text-emerald-50',
    text: 'bg-transparent',
  };

  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-md',
    large: 'px-6 py-3 text-lg',
  };

  const roundedStyles = {
    xs: 'rounded-sm',
    small: 'rounded-md',
    medium: 'rounded-lg',
    large: 'rounded-xl',
    full: 'rounded-full',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${
    sizeStyles[size]
  } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${
    roundedStyles[rounded]
  } ${className}`;

  return (
    <motion.button
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      initial="initial"
      whileHover="hover"
      animate="animate"
      {...props}
    >
      <div className={`overflow-hidden relative  `}>
        <motion.div variants={animation ? firstTextVariant : ''}>
          {children}
        </motion.div>
        {animation && (
          <motion.div
            variants={secondTextVariant}
            aria-hidden
            className={`absolute inset-0 `}
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

// Button.propTypes = {
//   children: PropTypes.node.isRequired,
//   variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
//   disabled: PropTypes.bool,
//   onClick: PropTypes.func,
//   className: PropTypes.string,
// };

export default Button;
