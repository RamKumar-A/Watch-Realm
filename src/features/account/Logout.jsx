import { IoIosLogOut } from 'react-icons/io';

import { useLogout } from '../user/useLogout';

import AccountSectionTemplate from '../../ui/AccountSectionTemplate';
import Button from '../../ui/Button';

function Logout() {
  const { logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <AccountSectionTemplate
      button={
        <Button variant="danger" className="mt-4" onClick={handleLogout}>
          Logout
        </Button>
      }
      title="Logout"
      icon={<IoIosLogOut />}
      subTitle="Securely log out of your account."
    />
  );
}

export default Logout;
