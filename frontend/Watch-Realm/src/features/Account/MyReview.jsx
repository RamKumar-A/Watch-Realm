import { MdOutlineRateReview } from 'react-icons/md';
import AccountSectionTemplate from '../../ui/AccountSectionTemplate';
import Button from '../../ui/Button';

function MyReview() {
  return (
    <AccountSectionTemplate
      button={<Button className="mt-4">View Reviews</Button>}
      title="My Reviews"
      subTitle="Manage your reviews on the watches."
      icon={<MdOutlineRateReview />}
    />
  );
}

export default MyReview;
