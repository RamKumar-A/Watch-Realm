function SummaryItems({ items }) {
  const { name, image_url } = items;
  return (
    <div className="w-48 p-1 border border-gray-600 rounded">
      <div className="w-full h-40">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-contain aspect-square p-2"
        />
      </div>
      <h1 className="text-center p-1 text-md">{name}</h1>
    </div>
  );
}

export default SummaryItems;
