import { useNavigate } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi2';

import AccountSectionTemplate from '../../ui/AccountSectionTemplate';
import Button from '../../ui/Button';

function MyOrders() {
  const navigate = useNavigate();

  return (
    <AccountSectionTemplate
      button={
        <Button className="mt-4" onClick={() => navigate('/my-order')}>
          View Orders
        </Button>
      }
      title="My Orders"
      subTitle="Track your orders and view order history."
      icon={<HiOutlineShoppingCart />}
    />
  );
}

export default MyOrders;
