import { FaUserCircle } from 'react-icons/fa';

import { useUser } from '../features/user/useUser';

import MyProfile from '../features/account/MyProfile';
import MyOrders from '../features/account/MyOrders';
import MyWishlist from '../features/account/MyWishlist';
import MyReview from '../features/account/MyReview';
import Logout from '../features/account/Logout';

function Account() {
  const { user } = useUser();

  const userPhoto = user?.data?.photo;
  const { email, name } = user?.data || {};

  return (
    <section className="min-h-screen py-10 px-5 lg:px-20">
      <div className="">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">My Account</h1>
          <p className="">
            Manage your profile, orders, and wishlist with ease.
          </p>
        </div>
        {/* Header */}
        <div className="flex flex-col items-center mt-5 text-center">
          {userPhoto ? (
            <div className="w-20 h-20 rounded-full">
              <img
                src={userPhoto}
                className="w-full h-full rounded-full"
                alt={user?.data?.id}
              />
            </div>
          ) : (
            <FaUserCircle size={80} className="" />
          )}
          <h1 className="text-xl font-semibold mt-4 capitalize">{name}</h1>
          <p className="mt-2">
            Email: <span>{email}</span>
          </p>
          {/* <p className=" mt-2">
                Manage your profile, orders, and wishlist with ease.
              </p> */}
        </div>
      </div>

      {/* Account Sections */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <MyProfile />
        {/* Orders Section */}
        <MyOrders />
        {/* Wishlist Section */}
        <MyWishlist />
        {/* Reviews Section */}
        <MyReview />
        {/* Settings Section */}
        {/* <Settings /> */}
        {/* Logout Section */}
        <Logout />
      </div>
    </section>
  );
}

export default Account;
