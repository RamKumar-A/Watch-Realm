import toast from 'react-hot-toast';
import { HiXMark } from 'react-icons/hi2';

function ErrorToast({ t, children }) {
  return (
    <div className="flex items-center gap-3">
      <span>{children}</span>
      <button onClick={() => toast.dismiss(t.id)}>
        <HiXMark />
      </button>
    </div>
  );
}

export default ErrorToast;
