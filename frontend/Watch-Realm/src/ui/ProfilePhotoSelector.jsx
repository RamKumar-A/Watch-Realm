import { useRef, useState } from 'react';
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

function ProfilePhotoSelector({
  image,
  setImage,
  register,
  field,
  defaultValue,
}) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);

      setPreviewUrl(preview);
    }
  }

  function handleRemoveImage() {
    setImage(null);
    setPreviewUrl(null);
  }

  function onChooseFile() {
    inputRef.current.click();
  }

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={(e) => {
          inputRef.current = e;
          register(field, {}).ref(e);
        }}
        onChange={(e) => {
          register('photo').onChange(e); // pass to RHF
          handleImageChange(e); // set preview
        }}
        className="hidden"
        // defaultValue={defaultValue}
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-highlight-dark rounded-full relative cursor-pointer">
          <LuUser className="text-xl text-accent-primary" />
          <button
            className="w-8 h-8 flex items-center justify-center bg-linear-to-tr from-accent-primary/80 to-accent-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer "
            onClick={onChooseFile}
            type="button"
          >
            <LuUpload className="" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl || defaultValue}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            type="button"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePhotoSelector;
