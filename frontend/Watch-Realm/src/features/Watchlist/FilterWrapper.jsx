function FilterWrapper({ children, onClick = () => {} }) {
  return (
    <div
      onClick={onClick}
      className="bg-secondary-default shadow-md py-4 px-3 cursor-pointer rounded border border-highlight-default"
    >
      {children}
    </div>
  );
}

export default FilterWrapper;
