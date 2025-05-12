function Empty({ children }) {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="tracking-wider text-2xl sm:text-4xl font-bold text-center">
        {children}
      </div>
    </div>
  );
}

export default Empty;
