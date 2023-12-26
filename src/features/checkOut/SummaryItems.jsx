function SummaryItems({ items }) {
  const { name, image_url, material_type } = items;
  return (
    <div className="py-5 px-2">
      <div className="flex flex-col items-center border border-gray-900 border-b-2 shadow-lg shadow-gray-900">
        <img
          src={image_url}
          alt="name"
          className="w-[500px] h-[300px] object-contain pt-2"
        />
        <h1 className="p-5">
          <span className="font-semibold">Name: </span>
          {name}
        </h1>
        <p className="p-5">
          <span className="font-semibold">Material Type: </span>
          {material_type}
        </p>
      </div>
    </div>
  );
}

export default SummaryItems;
