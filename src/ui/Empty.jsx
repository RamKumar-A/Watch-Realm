function Empty({ children }) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <p className="uppercase text-4xl font-bold  px-2 text-center">
        {children}
      </p>
    </div>
  );
}

export default Empty;
