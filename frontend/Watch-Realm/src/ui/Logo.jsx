import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="md:font-extrabold">
      <Link to="/">
        <h2 className="lg:text-3xl text-contrastText-primary md:text-2xl sm:text-[1.65rem] text-[1.25rem] space-x-1 logo drop-shadow-md">
          <span className="">Watch</span>
          <span className="text-contrastText-primary/40 ">Realm</span>
        </h2>
      </Link>
    </div>
  );
}

export default Logo;
