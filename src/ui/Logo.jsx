import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="font-dancingScript font-extrabold">
      <Link to="/">
        <h2 className="lg:text-4xl text-gray-800 text-3xl space-x-1 logo ">
          <span>Watch</span>
          <span className="text-gray-400 ">Realm</span>
        </h2>
      </Link>
    </div>
  );
}

export default Logo;
