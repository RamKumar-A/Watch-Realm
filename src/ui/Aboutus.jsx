import { motion } from 'framer-motion';
import PageWrapper from '../PageWrapper';

function Aboutus() {
  return (
    <PageWrapper>
      <div className="space-y-3">
        <h1 className="text-center  text-2xl font-extrabold tracking-wide p-3 ">
          OUR <span className="text-gray-400">VISION</span>
        </h1>
        <div className="grid sm:grid-flow-col place-items-center p-2 gap-2">
          <p className="text-lg sm:text-xl xl:text-2xl leading-10 text-center p-2 font-dancingScript">
            Our vision is to make quality timepieces accessible to everyone. We
            aim to curate a diverse collection of wristwatches that cater to
            various preferences, from classic to contemporary, sporty to
            sophisticated, and everything in between. We want to be your go-to
            destination for finding the perfect watch for every occasion.
          </p>
          {/* </div> */}
          <div className="bg-red-600 md:w-full lg:w-3/4 max-h-fit">
            <img
              src="https://rolex-1.myshopify.com/cdn/shop/files/abou-04.jpg?v=1622628838&width=1500"
              className="w-full h-full object-cover aspect-square"
              alt="aboutus"
            />
          </div>
        </div>

        <div className="text-center p-3 space-y-4 ">
          <p className="   text-center">Our Valuables</p>
          <h1 className="text-2xl font-extrabold tracking-wide ">
            NEW ERA <span className="text-gray-400">WORKS</span>
          </h1>
          <p className="font-greatVibes   text-center">Super Luxury Watches</p>
        </div>
        <main className="flex flex-wrap items-center justify-center ">
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
          />
        </main>
      </div>
    </PageWrapper>
  );
}

function Watches({ title, img }) {
  return (
    <div className={` text-center p-2  `}>
      <div className="p-2">
        <motion.img
          src={img}
          alt="alt"
          className="mx-auto p-4 rounded-full  "
          whileHover={{ backgroundColor: '#70606052', scale: 1.03 }}
        />
      </div>

      <h1 className="font-extrabold text-xl sm:text-2xl">{title}</h1>
      <p className="text-center py-3 sm:text-center sm:text-xl font-greatVibes font-normal  ">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
    </div>
  );
}

export default Aboutus;
