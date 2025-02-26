import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="font-dancingScript font-extrabold">
      <Link to="/">
        <h2 className="lg:text-4xl text-contrastText-primary md:text-3xl text-[1.65rem] space-x-1 logo drop-shadow-md">
          <span className="">Watch</span>
          <span className="text-contrastText-primary/40 ">Realm</span>
        </h2>
      </Link>
    </div>
  );
}

export default Logo;
