function Empty({ children }) {
  return (
    <div className="flex items-center justify-center w-full ">
      <h2 className="tracking-wider text-2xl sm:text-4xl font-bold text-center">
        {children}
      </h2>
    </div>
  );
}

export default Empty;
