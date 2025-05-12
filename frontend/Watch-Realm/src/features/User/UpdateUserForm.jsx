import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useUpdatePassword } from './useUpdatePassword';
import { useUpdateUser } from './useUpdateUser';

import SuccessToast from '../../ui/SuccessToast';
import ErrorToast from '../../ui/ErrorToast';
import FormError from '../../ui/FormError';
import Button from '../../ui/Button';
import ProfilePhotoSelector from '../../ui/ProfilePhotoSelector';
import { useUser } from './useUser';

function UpdateUserForm({ onClose }) {
  const [editPassword, setEditPassword] = useState(false);
  return (
    <div>
      <AnimatePresence>
        {editPassword ? (
          <UpdatePassword onClose={onClose} />
        ) : (
          <UpdateUserData onClose={onClose} />
        )}
      </AnimatePresence>
      <div className="mt-5 flex items-center justify-end">
        <Button
          variant="secondary"
          onClick={() => setEditPassword(!editPassword)}
        >
          {editPassword ? 'edit user' : 'edit password'}
        </Button>
      </div>
    </div>
  );
}

function UpdateUserData({ onClose }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { updateUser } = useUpdateUser();
  const { user } = useUser();
  const [profilePic, setProfilePic] = useState(user?.data.photo);
  function updateUserData(data) {
    updateUser(
      {
        name: data?.name,
        photo: profilePic,
      },
      {
        onSuccess: () => {
          toast.success((t) => <SuccessToast t={t}>User updated</SuccessToast>);
          if (onClose) onClose();
        },
        onError: () => {
          toast.error((t) => (
            <ErrorToast t={t}>Error While Updating</ErrorToast>
          ));
        },
      }
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-6"
      onSubmit={handleSubmit(updateUserData)}
      encType="multipart/form-data"
    >
      <div className="mb-4">
        <ProfilePhotoSelector
          register={register}
          field="photo"
          image={profilePic}
          setImage={setProfilePic}
          defaultValue={user?.data.photo}
        />
        <FormError error={errors?.photo?.message} />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-2">
          Edit name
        </label>
        <input
          type="text"
          id="name"
          defaultValue={user?.data?.name}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-primary"
          placeholder="Enter name"
          {...register('name', { required: 'This field is required' })}
        />
        <FormError error={errors?.name?.message} />
      </div>
      <Button type="submit" className="w-full uppercase transition">
        Update user
      </Button>
    </motion.form>
  );
}

function UpdatePassword({ onClose }) {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const { updatePassword } = useUpdatePassword();

  function updateUserPassword(data) {
    updatePassword(data, {
      onSuccess: () => {
        toast.success((t) => (
          <SuccessToast t={t}> User password updated </SuccessToast>
        ));
        onClose();
      },
      onError: () => {
        toast.error((t) => (
          <ErrorToast t={t}> Error While Upadating </ErrorToast>
        ));
      },
    });
  }
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-6"
      onSubmit={handleSubmit(updateUserPassword)}
    >
      <div className="mb-4">
        <label htmlFor="password" className="block font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-primary"
          placeholder="Enter your password"
          {...register('passwordCurrent', {
            required: 'This field is required',
          })}
        />
        <FormError error={errors?.passwordCurrent?.message} />
      </div>
      <div className="mb-4">
        <label htmlFor="updatePassword" className="block font-medium mb-2">
          New Password
        </label>
        <input
          type="password"
          id="updatePassword"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-primary"
          placeholder="Enter new password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 character',
            },
          })}
        />
        <FormError error={errors?.password?.message} />
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmUpdatePassowrd"
          className="block font-medium mb-2"
        >
          Confirm New Passowrd
        </label>
        <input
          type="password"
          id="confirmUpdatePassowrd"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-primary"
          placeholder="Confirm new password"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
        <FormError error={errors?.passwordConfirm?.message} />
      </div>
      <Button type="submit" className="w-full uppercase transition">
        Update password
      </Button>
    </motion.form>
  );
}

export default UpdateUserForm;

{
  /* <ProfilePhotoSelector
          register={register}
          field="photo"
          image={previewUrl}
          removeImage={() => setValue('photo', null)}
        /> */
}

{
  /* <input
          type="file"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-primary"
          {...register('photo', {
            // validate: {
            //   fileSize: (files) =>
            //     files?.[0]?.size < 2 * 1024 * 1024 ||
            //     'File size should be less than 2MB',
            // },
          })}
          // onChange={(e) => setFileInput(e.target.files)}
          accept="image/*"
        /> */
}
