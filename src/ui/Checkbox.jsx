function Checkbox({ checked, onChange, disabled, label }) {
  return (
    <label
      className={`flex items-center gap-2 ${
        disabled
          ? 'cursor-not-allowed opacity-60'
          : 'cursor-pointer opacity-100'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={` w-5 h-5 border-2 rounded grid place-items-center ${
          checked ? 'bg-red-600' : '#fff'
        } ${disabled ? 'cursor-not-allowed ' : 'cursor-pointer '}`}
      />
      <span
        className={`text-md font-light brightness-150 ${
          disabled ? '#999' : '#000'
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export default Checkbox;
