import { useParams } from 'react-router-dom';
import { useSingleWatch } from './useSingleWatch';
import { useEffect, useRef, useState } from 'react';
import { HiHeart } from 'react-icons/hi2';
import { motion, useInView } from 'framer-motion';
import BrandDetails from './productDetails/BrandDetails';
import Specification from './productDetails/Specification';
import ReviewsSection from './productDetails/ReviewsSection';
import ProductDetailsFooter from './productDetails/ProductDetailsFooter';
import Button from '../../ui/Button';
import { childVariants, parentVariants } from '../../helpers/variants';
import ImageSelector from './productDetails/ImageSelector';
import ProductInfo from './productDetails/ProductInfo';
import { useCart } from '../cart/useCart';
import { useCreateCartItem } from '../cart/useCreateCartItem';
import { useCreateWishlist } from '../wishlist/useCreateWishlist';
import { useWishlist } from '../wishlist/useWishlist';
import toast from 'react-hot-toast';
import SuccessToast from '../../ui/SuccessToast';
import ErrorToast from '../../ui/ErrorToast';
import Spinner from '../../ui/Spinner';
import { useUser } from '../user/useUser';

function ProductDetails() {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const params = useParams();

  const { isAuthenticated } = useUser();
  const { data } = useSingleWatch(params.pid);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { createWishlistItem, isPending: isWishlistItemCreating } =
    useCreateWishlist();
  const { createCartItem } = useCreateCartItem();

  const watch = data?.data || {};
  const {
    brand,
    description,
    tag,
    images,
    material,
    model,
    name,
    price,
    reviews,
    size,
    discountPercentage,
    imageCover,
    movement,
    case: watchCase,
    strap,
    dial,
    id,
  } = watch;

  useEffect(
    function () {
      const inCart = cart?.data?.items?.some((c) => c.watch.id === id);
      setIsInCart(inCart);
      const inWishlist = wishlist?.data?.items?.some(
        (w) => w?.watch?._id === id
      );
      setIsInWishlist(inWishlist);
    },
    [cart?.data?.items, id, wishlist]
  );

  function handleCreateWishlist() {
    createWishlistItem(
      { watchId: id },
      {
        onSuccess: () => {
          toast.success((t) => (
            <SuccessToast t={t}>Item added to wishlist</SuccessToast>
          ));
        },
        onError: () => {
          toast.error((t) => (
            <ErrorToast t={t}>Error while updatig wishlist</ErrorToast>
          ));
        },
      }
    );
  }

  function handleAddToCart() {
    return isAuthenticated
      ? createCartItem(
          { watchId: id },
          {
            onSuccess: () => {
              toast.success((t) => (
                <SuccessToast t={t}>Item Added to cart</SuccessToast>
              ));
            },
            onError: () => {
              toast.error((t) => (
                <ErrorToast t={t}>Error while updating cart</ErrorToast>
              ));
            },
          }
        )
      : toast.error('please');
  }

  return (
    <div className=" min-h-screen lg:px-16 " ref={ref}>
      <motion.div
        className="flex items-center justify-center gap-2 py-1 md:py-5"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
      >
        {brand?.brandLogo && (
          <img
            className="w-10 h-10 object-contain"
            src={brand.brandLogo}
            alt={brand.brand}
          />
        )}
        <h1 className="uppercase font-bold">{brand?.brand}</h1>
      </motion.div>

      {/* Hero Section */}
      <section className="grid md:grid-cols-[1fr_40%]">
        {/* Image Selector */}
        <ImageSelector imageCover={imageCover} images={images} />
        {/* Product Info */}
        <motion.div
          className="md:place-self-center"
          variants={parentVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <ProductInfo
            description={description}
            discountPercentage={discountPercentage}
            material={material}
            size={size}
            price={price}
            model={model}
            name={name}
            tag={tag}
          />
          {/* CTA */}
          <motion.div
            className="flex flex-col items-end justify-center gap-2 p-3"
            variants={childVariants}
          >
            <Button
              variant="text"
              rounded="full"
              size="small"
              className={`bg-secondary-default py-3 rounded-full border border-highlight-dark ${
                isInWishlist ? 'text-red-600' : 'text-secondary-dark'
              } `}
              onClick={
                isAuthenticated
                  ? () => handleCreateWishlist()
                  : toast.error((t) => (
                      <ErrorToast t={t}> Please login</ErrorToast>
                    ))
              }
            >
              {isWishlistItemCreating ? (
                <Spinner small background />
              ) : (
                <HiHeart
                  className={` ${
                    isInWishlist ? 'text-red-500' : 'text-secondary-dark'
                  }`}
                  size={18}
                />
              )}
            </Button>
            <Button
              size="large"
              className="w-full "
              disabled={isInCart}
              onClick={handleAddToCart}
            >
              {isInCart ? 'In cart' : 'Add to cart'}
            </Button>
          </motion.div>
        </motion.div>
      </section>
      <div className="w-full bg-highlight-dark h-[0.5px] " />
      <div className="">
        {/* specification */}
        <Specification
          movement={movement}
          dial={dial}
          strap={strap}
          watchCase={watchCase}
        />
        <div className="w-full bg-highlight-dark h-[0.5px] " />
        {/* brand details */}
        <BrandDetails brand={brand} />
        <div className="w-full bg-highlight-dark h-[0.5px] " />
        {/* reviews */}
        <ReviewsSection reviews={reviews} />
        <div className="w-full bg-highlight-dark h-[0.5px] " />

        {/* footer */}
        <ProductDetailsFooter />
      </div>
    </div>
  );
}

export default ProductDetails;
