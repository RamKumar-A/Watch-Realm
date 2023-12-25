function TestimonialDetails({ test }) {
  return (
    <div className="mx-auto">
      <div className="">
        <img src={test.img} alt={test.title} className=" mx-auto " />
      </div>
      <div className="p-5 text-center">
        <p className="text-[16px] text-gray-500 testimonial-head">
          {test.subTitle}
        </p>
        <p className="text-[20px] font-semibold pt-3">{test.title}</p>
      </div>
    </div>
  );
}

export default TestimonialDetails;
