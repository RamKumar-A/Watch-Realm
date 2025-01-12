import { useNavigate } from 'react-router-dom';

import { useUser } from '../features/user/useUser';

import Button from './Button';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated } = useUser();

  return isAuthenticated ? (
    children
  ) : (
    <div className="flex items-center justify-center flex-col gap-5 min-h-[90dvh]">
      <h2 className="text-center text-2xl font-bold ">
        You're not logged in. Please login
      </h2>
      <Button className=" py-1 px-5 " onClick={() => navigate('/login')}>
        Login
      </Button>
    </div>
  );
}

export default ProtectedRoute;
