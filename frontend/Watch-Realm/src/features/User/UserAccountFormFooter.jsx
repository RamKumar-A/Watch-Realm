import { Link } from 'react-router-dom';

function UserAccountFormFooter({ to = '#', title, linkText }) {
  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
        {title}?{' '}
        <Link to={to} className="text-gray-800 font-semibold">
          {linkText}
        </Link>
      </p>
    </div>
  );
}

export default UserAccountFormFooter;
