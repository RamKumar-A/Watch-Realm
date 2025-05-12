function ErrorBoundary({ error, resetErrorBoundary }) {
  return (
    <>
      <main className="h-[100vh] bg-gray-300 flex items-center justify-center p-20">
        <div className="bg-gray-300 border border-gray-400 p-20 flex-[0 1 96rem]">
          <h1 className="mb-[1.6rem]">Something went wrong 🤔</h1>
          <p className="mb-[3.2rem] text-gray-500">{error.message}</p>
          <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
      </main>
    </>
  );
}

export default ErrorBoundary;
