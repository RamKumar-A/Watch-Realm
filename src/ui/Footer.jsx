import { HiMail, HiPhone } from 'react-icons/hi';

function Footer() {
  return (
    <div className="">
      <div className=" text-sm bg-gray-300 text-gray-800 flex items-center justify-center gap-3 p-4 flex-wrap">
        <div>
          <p>Contact Us</p>
        </div>
        <div className="flex gap-3 items-center">
          <p className="flex items-center gap-1">
            <HiPhone />
            +999 999 9999
          </p>
          <p className="flex items-center gap-1">
            <HiMail />
            test@test.com
          </p>
        </div>
      </div>
      <div className="bg-gray-950 text-gray-100 grid place-items-center h-[75px] p-2">
        <p>All rights reserved &copy; 2023</p>
      </div>
    </div>
  );
}

export default Footer;
