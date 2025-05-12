import { IoIosLogOut } from 'react-icons/io';

import { useLogout } from '../User/useLogout';

import AccountSectionTemplate from '../../ui/AccountSectionTemplate';
import Button from '../../ui/Button';
import Dialog from '../../ui/Dialog';
import { useState } from 'react';

function Logout() {
  const [openEdit, setOpenEdit] = useState(false);
  const { logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <>
      <AccountSectionTemplate
        button={
          <Button
            variant="danger"
            className="mt-4"
            onClick={() => setOpenEdit(true)}
          >
            Logout
          </Button>
        }
        title="Logout"
        icon={<IoIosLogOut />}
        subTitle="Securely log out of your account."
      />
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} title="Logout">
        <div className="space-y-5">
          <p className="text-md md:text-base">Are you sure want to logout?</p>
          <div className="flex items-center justify-end gap-5">
            <Button
              variant="secondary"
              className="mt-4 "
              onClick={() => setOpenEdit(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" className="mt-4" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Logout;
