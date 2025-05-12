function UserAccountFormTemplate({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-2 py-4">
      <div className="bg-secondary-default p-4 md:p-8 rounded-lg shadow-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

export default UserAccountFormTemplate;
