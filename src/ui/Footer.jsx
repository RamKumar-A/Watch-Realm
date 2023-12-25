import { HiMail, HiPhone } from 'react-icons/hi';

function Footer() {
  return (
    <div className="mt-10 -mb-10  grid">
      <div className=" text-[15px] h-[100px] bg-gray-300 text-gray-800 grid place-items-center">
        <p>Contact Us</p>
        <p className="flex items-center gap-2">
          <HiPhone />
          +999 999 9999
        </p>
        <p className="flex items-center gap-2">
          <HiMail />
          test@test.com
        </p>
      </div>
      <div className="bg-gray-950 text-gray-100 grid place-items-center h-[75px] p-2">
        <p>All rights reserved &copy; 2023</p>
      </div>
    </div>
  );
}

export default Footer;
