import InputWithLabel from '../../ui/InputWithLabel';

function CheckoutForm() {
  return (
    <fieldset className="border py-4 px-2 bg-gray-200 rounded-sm ">
      <legend className="bg-gray-50 rounded-sm border border-gray-400 p-1 px-2 text-lg font-medium">
        Checkout Details
      </legend>
      <div className="gap-4 grid sm:grid-cols-2 grid-cols-1 sm:content-center">
        <InputWithLabel label="Name" id="name" type="text" />

        <InputWithLabel label="Mobile Number" id="mobile" type="number" />

        <InputWithLabel label="Pin Code" id="pin-code" type="number" />

        <InputWithLabel label="Email" id="mail" type="email" />

        <div className="relative sm:col-span-2">
          <textarea
            className="px-1 py-2 h-20 block w-full text-sm text-gray-900 border  border-gray-300 outline-none peer resize-none"
            rows="2"
            id="address"
            name="address"
            placeholder=""
          />
          <label
            htmlFor="address"
            className=" absolute top-5 left-2 text-sm duration-300 peer-focus:-translate-y-[2rem] peer-focus:scale-75 -translate-y-[2rem] scale-75 z-10 peer-valid:text-sm px-1 peer-valid:bg-gray-50 peer-placeholder-shown:bg-gray-50  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2"
          >
            Address (Area and Street)
          </label>
        </div>

        <InputWithLabel label="Landmark (optional)" id="landmark" type="text" />

        <InputWithLabel
          label="Alternative Phone (optional)"
          id="alternate-number"
          type="number"
        />
      </div>
    </fieldset>
  );
}

export default CheckoutForm;
