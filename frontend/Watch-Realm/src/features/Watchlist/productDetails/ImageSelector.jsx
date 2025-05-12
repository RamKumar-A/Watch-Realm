import { useState } from 'react';
import { motion } from 'framer-motion';

function ImageSelector({ images, imageCover }) {
  const [selectedImage, setSelectedImage] = useState(images?.at(0) | []);

  return (
    <div className="grid place-content-center py-2 gap-2 lg:grid-cols-1 xl:grid-cols-[20%_1fr]">
      <div className="xl:w-40 max-md:px-2 flex max-md:flex-wrap xl:flex-col items-center justify-center gap-2 order-2 xl:order-1">
        {[...(images || []), imageCover]?.map((img, i) => (
          <div
            className="xl:h-36 xl:w-36 h-24 w-24 border border-highlight-dark cursor-pointer p-0.5 bg-white"
            onClick={() => setSelectedImage(img)}
            key={i}
          >
            <motion.img
              className="w-full h-full object-cover"
              src={img}
              alt={i}
              initial={{ scale: 0 }}
              whileInView={{
                scale: 1,
                transition: {
                  delay: i * 0.05,
                },
              }}
              viewport={{ once: true }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <motion.div
        className="w-screen h-[70dvh] md:w-full lg:min-w-20 lg:w-full lg:h-[75dvh] xl:h-screen order-1 xl:order-2 p-3 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <img
          src={selectedImage || images?.[0]}
          className=" h-full w-full object-center xl:object-cover object-contain scale-110 md:scale-100 xl:scale-90 p-2"
          alt="imageCover"
        />
      </motion.div>
    </div>
  );
}

export default ImageSelector;
