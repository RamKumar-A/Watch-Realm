import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ShareButton = ({ productName, productUrl }) => {
  const shareData = [
    {
      icon: <FaWhatsapp size={28} />,
      text: 'Whatsapp',
      url: `https://wa.me/?text=${encodeURIComponent(
        `Check this out: ${productName} - ${productUrl}`
      )}`,
    },
    {
      icon: <FaXTwitter size={28} />,
      text: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${productName} - ${productUrl}`
      )}`,
    },
  ];
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setIsLinkCopied(true);
      toast.success('Link Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
      setIsLinkCopied(false);
    }
  };

  return (
    <div className="">
      <div className="flex items-center">
        <input className="flex-1" type="url" value={productUrl || ''} />
        <button
          onClick={handleCopy}
          className={`bg-accent-primary rounded-md  px-2 py-1 md:p-2 text-sm border ${
            isLinkCopied
              ? 'bg-accent-secondary  border-highlight-dark text-contrastText-primary'
              : 'text-contrastText-secondary border-highlight-default'
          }`}
        >
          {isLinkCopied ? 'Copied' : 'Copy Link'}
        </button>
      </div>

      <div className="py-5 space-y-5">
        <h2 className="text-lg font-semibold">Share with:</h2>
        <div className="flex gap-4 flex-wrap items-center justify-center">
          {shareData.map((share) => (
            <Link
              to={share.url}
              target="_blank"
              rel="noopener noreferrer"
              key={share.text}
            >
              <div className="flex flex-col items-center gap-2 ">
                <span className="p-5 bg-accent-secondary rounded-xl border border-highlight-dark">
                  {share.icon}
                </span>
                <span className="text-sm">{share.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareButton;
