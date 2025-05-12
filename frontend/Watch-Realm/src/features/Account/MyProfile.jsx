import { useState } from 'react';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';

import UpdateUserForm from '../User/UpdateUserForm';

import AccountSectionTemplate from '../../ui/AccountSectionTemplate';
import Dialog from '../../ui/Dialog';
import Button from '../../ui/Button';

function MyProfile() {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <AccountSectionTemplate
      title="Profile Details"
      subTitle="View and update your personal details."
      button={
        <Button className="mt-4" onClick={() => setOpenEdit(true)}>
          Edit Profile
        </Button>
      }
      icon={<HiOutlineCog6Tooth />}
    >
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Edit Profile"
      >
        <UpdateUserForm onClose={() => setOpenEdit(false)} />
      </Dialog>
    </AccountSectionTemplate>
  );
}

export default MyProfile;
