import styled from 'styled-components';

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: lightgray;
  border: 1px solid lightgrey;
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    /* font-family: 'Sono'; */
    margin-bottom: 3.2rem;
    color: gray;
  }
`;

function ErrorBoundary({ error, resetErrorBoundary }) {
  return (
    <>
      <StyledErrorFallback>
        <Box>
          <h1>Something went wrong 🤔</h1>
          <p>{error.message}</p>
          <button onClick={resetErrorBoundary}>Try Again</button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorBoundary;
