function UserAccountFormHeader({ title, children }) {
  return (
    <div className="text-center ">
      {/* <FaUserCircle size={50} className=" mx-auto" /> */}
      <div className="w-8 h-8 mx-auto">
        <img src="/img/logo.png" className="rounded" alt="logo" />
      </div>
      <h1 className="text-xl font-bold mt-4">{title}</h1>
      <p className="opacity-50 text-md md:text-lg">{children}</p>
    </div>
  );
}

export default UserAccountFormHeader;
