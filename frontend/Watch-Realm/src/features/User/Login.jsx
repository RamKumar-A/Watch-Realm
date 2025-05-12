import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useLogin } from './useLogin';

import UserAccountFormHeader from './UserAccountFormHeader';
import UserAccountFormTemplate from './UserAccountFormTemplate';
import UserAccountFormFooter from './UserAccountFormFooter';
import SuccessToast from '../../ui/SuccessToast';
import ErrorToast from '../../ui/ErrorToast';
import FormError from '../../ui/FormError';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { login } = useLogin();

  function onSubmit(data) {
    login(data, {
      onSuccess: () => {
        toast.success((t) => <SuccessToast t={t}>Login Success</SuccessToast>);
        navigate('/my-account');
      },

      onError: () =>
        toast.error((t) => (
          <ErrorToast t={t}>Error while logging in</ErrorToast>
        )),
    });
  }

  return (
    <UserAccountFormTemplate>
      <UserAccountFormHeader title="Welcome Back">
        Log in to access your account
      </UserAccountFormHeader>
      <form className="mt-6 py-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block max-md:text-md font-medium mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            defaultValue="ramk41934@gmail.com"
            className="w-full p-3 border border-highlight-default rounded-lg focus:outline-none focus:ring-1 focus:ring-highlight-dark"
            placeholder="Enter your email"
            {...register('email', { required: 'This field is required' })}
          />
          <FormError error={errors?.email?.message} />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block max-md:text-md font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            defaultValue="123456789"
            className="w-full p-3 border border-highlight-default rounded-lg focus:outline-none focus:ring-1 focus:ring-highlight-dark"
            placeholder="Enter your password"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Minimum 8 characters is required',
              },
            })}
          />
          <FormError error={errors?.password?.message} />
        </div>
        <Button type="submit" rounded="small" className="w-full py-3 mt-4">
          Log In
        </Button>
      </form>

      <UserAccountFormFooter
        to="/signup"
        title="Don't have an account"
        linkText="Sign Up"
      />
    </UserAccountFormTemplate>
  );
}
