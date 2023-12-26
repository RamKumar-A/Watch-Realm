import styled from 'styled-components';

const Paragraph = styled.p`
  font-weight: 300;
  padding: 1rem 0.8rem;
  text-align: center;
`;

function Aboutus() {
  return (
    <div className="p-3 h-full">
      <div className="grid lg:mx-[10rem] sm:grid-cols-2 place-items-center">
        <div className="p-1">
          <h1 className="text-center lg:text-5xl text-3xl font-bold p-2 ">
            OUR <span className="text-gray-400">VISION</span>
          </h1>
          <Paragraph className="text-[1.25rem] lg:text-2xl  aboutus-para ">
            Our vision is to make quality timepieces accessible to everyone. We
            aim to curate a diverse collection of wristwatches that cater to
            various preferences, from classic to contemporary, sporty to
            sophisticated, and everything in between. We want to be your go-to
            destination for finding the perfect watch for every occasion.
          </Paragraph>
        </div>
        <img
          src="https://rolex-1.myshopify.com/cdn/shop/files/abou-04.jpg?v=1622628838&width=1500"
          alt="alt"
        />
      </div>

      <div className="text-center p-3 mt-10">
        <Paragraph className="aboutus-para">Our Valuables</Paragraph>
        <h1 className="p-2 text-2xl font-extrabold lg:text-4xl ">
          NEW ERA <span className="text-gray-400">WORKS</span>
        </h1>
        <Paragraph className="aboutus-para">Super Luxury Watches</Paragraph>
      </div>
      <main>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 lg:mx-10">
          <Watches
            title="HYBRID"
            img="https://rolex-1.myshopify.com/cdn/shop/files/abou-09.png?v=1622628678&width=275"
          />
          <Watches
            title="AUTOMATIC"
            img="https://rolex-1.myshopify.com/cdn/shop/files/abou-10.png?v=1622628713&width=275"
          />
          <Watches
            title="STAINLESS"
            img="https://rolex-1.myshopify.com/cdn/shop/files/abou-11.png?v=1622628740&width=275"
          />
          <Watches
            title="GOLD DIAL"
            img="https://rolex-1.myshopify.com/cdn/shop/files/abou-12.png?v=1622628765&width=275"
          />

          <Watches
            title="WORKWEAR"
            img="https://rolex-1.myshopify.com/cdn/shop/files/abou-13.png?v=1622628780&width=275"
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </main>
    </div>
  );
}

function Watches({ title, img, className }) {
  return (
    <div className={` text-center p-2 ${className}`}>
      <img
        src={img}
        alt="alt"
        className="m-auto p-4 hover:scale-105 hover:bg-gray-300 rounded-full hover:transition-all duration-500"
      />
      <h1 className="font-extrabold text-xl sm:text-2xl">{title}</h1>
      <p className="text-center pt-5 sm:text-center sm:text-xl font-normal aboutus-para">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
    </div>
  );
}

export default Aboutus;
