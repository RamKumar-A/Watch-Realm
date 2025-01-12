import { useNavigate } from 'react-router-dom';
import { HiOutlineHeart } from 'react-icons/hi2';

import AccountSectionTemplate from '../../ui/AccountSectionTemplate';
import Button from '../../ui/Button';

function MyWishlist() {
  const navigate = useNavigate();

  return (
    <AccountSectionTemplate
      button={
        <Button className="mt-4" onClick={() => navigate('/my-wishlist')}>
          View Wishlist
        </Button>
      }
      title="Wishlist"
      subTitle="Keep track of your favorite watches."
      icon={<HiOutlineHeart />}
    />
  );
}

export default MyWishlist;
