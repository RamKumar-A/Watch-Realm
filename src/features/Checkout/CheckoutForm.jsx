import { useForm } from 'react-hook-form';

import FormError from '../../ui/FormError';

function CheckoutForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { country: 'IN' } });

  function submit(data) {}

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)}>
      <h2 className="mb-4 font-bold">Address</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="">
          <label
            htmlFor="Country"
            className="w-full text-gray-700 font-medium mb-2"
          >
            Country
          </label>
          <input
            type="text"
            id="Country"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter your country"
            disabled
            {...register('country', { value: 'IN' })}
          />
          <FormError error={errors?.country?.message} />
        </div>
        <div className="">
          <label
            htmlFor="state"
            className="w-full text-gray-700 font-medium mb-2"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter your state"
            {...register('state', {
              required: 'This field is required',
            })}
          />
          <FormError error={errors?.state?.message} />
        </div>
        <div className="">
          <label
            htmlFor="street"
            className="w-full text-gray-700 font-medium mb-2"
          >
            Street
          </label>
          <input
            type="text"
            id="street"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter your street"
            {...register('street', {
              required: 'This field is required',
            })}
          />
          <FormError error={errors?.street?.message} />
        </div>
        <div className="">
          <label
            htmlFor="pincode"
            className="w-full text-gray-700 font-medium mb-2"
          >
            Pin Code
          </label>
          <input
            type="number"
            id="pincode"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter your pincode"
            {...register('pincode', {
              required: 'This field is required',
            })}
          />
          <FormError error={errors?.pincode?.message} />
        </div>
      </div>

      <button type="submit">submit</button>
    </form>
  );
}

export default CheckoutForm;
