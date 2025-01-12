import { HiOutlineCog8Tooth } from 'react-icons/hi2';

import AccountSectionTemplate from '../../ui/AccountSectionTemplate';
import Button from '../../ui/Button';

function Settings() {
  return (
    <AccountSectionTemplate
      button={<Button className="mt-4">Manage Settings</Button>}
      title="Settings"
      subTitle="Manage your preferences and account settings."
      icon={<HiOutlineCog8Tooth />}
    />
  );
}

export default Settings;
