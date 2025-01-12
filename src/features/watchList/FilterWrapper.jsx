function FilterWrapper({ children }) {
  return (
    <div className="bg-secondary-default shadow-md py-4 px-3 cursor-pointer rounded">
      {children}
    </div>
  );
}

export default FilterWrapper;
