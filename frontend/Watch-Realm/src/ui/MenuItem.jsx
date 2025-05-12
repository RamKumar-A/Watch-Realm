import PropTypes from 'prop-types';

function MenuItem({
  children,
  onClick,
  className = '',
  props,
  variant = 'primary',
}) {
  const variants = {
    primary: 'font-semibold text-md ',
  };
  const baseClassName =
    'px-4 py-2 text-contrastText-primary hover:bg-secondary-dark cursor-pointer ';
  const combinedClassName = `${baseClassName} ${variants[variant]} ${className}`;

  return (
    <li onClick={onClick} {...props} className={combinedClassName}>
      {children}
    </li>
  );
}

export default MenuItem;

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
