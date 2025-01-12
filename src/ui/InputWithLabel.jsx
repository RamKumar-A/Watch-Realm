import { motion } from 'framer-motion';

function InputWithLabel({ type, id, label, children }) {
  return (
    <div className={`relative  `}>
      {children ? (
        children
      ) : (
        <motion.input
          className="block w-full text-sm text-gray-900 border border-gray-300 py-3 outline-none peer px-2 z-20 "
          placeholder=""
          type={type}
          id={id}
          name={id}
          required
        />
      )}
      <motion.label
        htmlFor={id}
        className="absolute top-1/2 left-2 text-sm duration-300 -translate-y-[2.1rem] scale-75 peer-valid:text-sm peer-valid:bg-gray-100  peer-invalid:bg-gray-50 peer-placeholder-shown:bg-gray-50  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 line-clamp-1 px-2
        peer-focus:-translate-y-[2.1rem] peer-focus:scale-75
        "
      >
        {label}
      </motion.label>
    </div>
  );
}

export default InputWithLabel;
