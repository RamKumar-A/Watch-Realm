import Dialog from '../../ui/Dialog';

function UpdateUser({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} title={'Edit user'}>
      update
    </Dialog>
  );
}

export default UpdateUser;
