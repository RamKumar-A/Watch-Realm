import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import { useUser } from '../features/User/useUser';

import MyProfile from '../features/Account/MyProfile';
import MyOrders from '../features/Account/MyOrders';
import MyWishlist from '../features/Account/MyWishlist';
import MyReview from '../features/Account/MyReview';
import Logout from '../features/Account/Logout';

import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

function Account() {
  const navigate = useNavigate();

  const { user, isAuthenticated, isPending } = useUser();

  const userPhoto = user?.data?.photo;
  const { email, name, role } = user?.data || {};

  return (
    <section className="min-h-screen py-10 px-5 lg:px-20">
      {isPending && !isAuthenticated ? (
        <Spinner />
      ) : !isAuthenticated ? (
        <div className="flex items-center justify-center flex-col gap-5 h-screen">
          <h2 className="text-center text-2xl font-bold ">
            You're not logged in. Please login
          </h2>
          <Button
            className=" py-1 px-5 "
            onClick={() => navigate('/login')}
            size="small"
            rounded="large"
          >
            Login
          </Button>
        </div>
      ) : (
        <>
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
                    className="w-full h-full rounded-full object-cover object-center"
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

              <p className="px-4 py-0.5 rounded-lg text-sm bg-blue-900 text-white my-3 capitalize">
                {role}
              </p>
            </div>
          </div>

          {/* Account Sections */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            <MyProfile />
            <MyOrders />
            <MyWishlist />
            <MyReview />
            {/* <Settings /> */}
            <Logout />
          </div>
        </>
      )}
    </section>
  );
}

export default Account;
