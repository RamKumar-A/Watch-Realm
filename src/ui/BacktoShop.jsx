import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function BacktoShop() {
  const navigate = useNavigate();
  return (
    <div className="parent w-fit mx-5 md:mx-14 mt-5 p-2">
      <p
        className=" flex items-center gap-2 cursor-pointer child border-2 p-1 border-gray-50"
        onClick={() => navigate('/shop')}
      >
        <HiArrowLeft />
        Back to Shop
      </p>
    </div>
  );
}

export default BacktoShop;
