import { useSingleWatch } from './useSingleWatch';
import { useEffect, useRef, useState } from 'react';
import { HiHeart, HiShare } from 'react-icons/hi2';
import { motion, useInView } from 'framer-motion';
import BrandDetails from './productDetails/BrandDetails';
import Specification from './productDetails/Specification';
import ReviewsSection from './productDetails/ReviewsSection';
import ProductDetailsFooter from './productDetails/ProductDetailsFooter';
import Button from '../../ui/Button';
import { childVariants, parentVariants } from '../../helpers/variants';
import ImageSelector from './productDetails/ImageSelector';
import ProductInfo from './productDetails/ProductInfo';
import { useCart } from '../Cart/useCart';
import { useCreateCartItem } from '../Cart/useCreateCartItem';
import { useCreateWishlist } from '../Wishlist/useCreateWishlist';
import { useWishlist } from '../Wishlist/useWishlist';
import toast from 'react-hot-toast';
import SuccessToast from '../../ui/SuccessToast';
import ErrorToast from '../../ui/ErrorToast';
import Spinner from '../../ui/Spinner';
import { useUser } from '../User/useUser';
import ShareButton from '../../ui/ShareButton';
import Dialog from '../../ui/Dialog';

function ProductDetails() {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { isAuthenticated } = useUser();
  const { data, isPending: isWatchPending } = useSingleWatch();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { createWishlistItem, isPending: isWishlistItemCreating } =
    useCreateWishlist();
  const { createCartItem } = useCreateCartItem();

  const [openShare, setOpenShare] = useState(false);

  const watch = !isWatchPending ? data?.data || {} : {};
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

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  function handleCreateWishlist() {
    return isAuthenticated
      ? createWishlistItem(
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
        )
      : toast.error((t) => <ErrorToast t={t}> Please login</ErrorToast>);
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
      : toast.error((t) => <ErrorToast t={t}> Please login</ErrorToast>);
  }

  return (
    <div className=" min-h-screen lg:px-16 " ref={ref}>
      {isWatchPending ? (
        <Spinner />
      ) : (
        <>
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
                loading="lazy"
              />
            )}
            <h1 className="uppercase font-bold">{brand?.brand}</h1>
          </motion.div>

          {/* Hero Section */}
          <section className="grid md:grid-cols-[1fr_40%]">
            {/* Image Selector */}
            <ImageSelector imageCover={imageCover} images={images} />
            <div className="sm:hidden w-full bg-highlight-dark h-[0.5px] " />

            {/* Product Info */}
            <motion.div
              className="md:place-self-center max-md:my-5"
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
                className="flex flex-col md:items-end justify-center gap-5 p-3"
                variants={childVariants}
              >
                <div className="space-x-3 self-end">
                  <Button
                    size="small"
                    variant="text"
                    rounded="full"
                    className=" py-3 border border-accent-primary/50 text-accent-primary"
                    onClick={() => setOpenShare(true)}
                    animation={false}
                  >
                    <HiShare size={18} />
                  </Button>
                  <Button
                    variant="text"
                    rounded="full"
                    size="small"
                    className={` py-3 rounded-full border border-accent-primary/50 ${
                      isInWishlist
                        ? 'text-red-600 pointer-events-none'
                        : 'text-highlight-dark'
                    } `}
                    onClick={handleCreateWishlist}
                    disabled={!isAuthenticated}
                  >
                    {isWishlistItemCreating ? (
                      <Spinner small background />
                    ) : (
                      <HiHeart
                        className={` ${
                          isInWishlist ? 'text-red-500' : 'text-highlight-dark'
                        }`}
                        size={18}
                      />
                    )}
                  </Button>
                </div>
                <Button
                  size="large"
                  className="w-full md:w-full"
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
          <Dialog
            title="Share"
            onClose={() => setOpenShare(false)}
            open={openShare}
          >
            <ShareButton productName={name} productUrl={window.location.href} />
          </Dialog>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
