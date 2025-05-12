import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useSignup } from './useSignup';
import { useLogin } from './useLogin';

import UserAccountFormHeader from './UserAccountFormHeader';
import UserAccountFormTemplate from './UserAccountFormTemplate';
import UserAccountFormFooter from './UserAccountFormFooter';
import SuccessToast from '../../ui/SuccessToast';
import ErrorToast from '../../ui/ErrorToast';
import FormError from '../../ui/FormError';
import Button from '../../ui/Button';

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { signup } = useSignup();
  const { login } = useLogin();
  function onSubmit(data) {
    signup(data, {
      onSuccess: () => {
        login(data);
        toast.success((t) => (
          <SuccessToast t={t}>Account created successfully</SuccessToast>
        ));
      },
      onError: () => {
        toast.error((t) => (
          <ErrorToast t={t}> Error while creating account </ErrorToast>
        ));
      },
    });
  }
  return (
    // <div className=" flex items-center justify-center p-2">
    // <div className="bg-secondary-default p-4 md:p-8 rounded-lg shadow-lg w-full max-w-md">
    <UserAccountFormTemplate>
      <UserAccountFormHeader title="Create Account">
        Join us for a royal shopping experience
      </UserAccountFormHeader>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block  font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-3 border border-highlight-default rounded-lg focus:outline-none focus:ring-1 focus:ring-highlight-dark"
            placeholder="Enter your name"
            {...register('name', { required: 'This field is required' })}
          />
          <FormError error={errors?.name?.message} />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block  font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-highlight-default rounded-lg focus:outline-none focus:ring-1 focus:ring-highlight-dark"
            placeholder="Enter your email"
            {...register('email', { required: 'This field is required' })}
          />
          <FormError error={errors?.email?.message} />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-highlight-default rounded-lg focus:outline-none focus:ring-1 focus:ring-highlight-dark"
            placeholder="Create a password"
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
          <label htmlFor="confirmPassowrd" className="block  font-medium mb-2">
            Confirm Passowrd
          </label>
          <input
            type="password"
            id="confirmPassowrd"
            className="w-full p-3 border border-highlight-default rounded-lg focus:outline-none focus:ring-1 focus:ring-highlight-dark"
            placeholder="Confirm your password"
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues().password || 'Passwords need to match',
            })}
          />
          <FormError error={errors?.passwordConfirm?.message} />
        </div>
        <Button type="submit" className="w-full py-3 mt-6  " rounded="small">
          Sign Up
        </Button>
      </form>

      <UserAccountFormFooter
        to="/login"
        linkText="Log In"
        title="Already have an account"
      />
    </UserAccountFormTemplate>
    // </div>
    // </div>
  );
}
