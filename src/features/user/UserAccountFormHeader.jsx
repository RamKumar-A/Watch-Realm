function UserAccountFormHeader({ title, children }) {
  return (
    <div className="text-center ">
      {/* <FaUserCircle size={50} className=" mx-auto" /> */}
      <div className="w-16 h-16 mx-auto">
        <img
          src="../../../android-chrome-512x512.png"
          className="rounded"
          alt="logo"
        />
      </div>
      <h1 className="text-2xl md:text-2xl font-bold mt-4">{title}</h1>
      <p className="opacity-70 text-md">{children}</p>
    </div>
  );
}

export default UserAccountFormHeader;
