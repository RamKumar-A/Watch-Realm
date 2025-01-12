import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiHeart, HiStar } from 'react-icons/hi2';

import { useCreateCartItem } from '../cart/useCreateCartItem';
import { useCart } from '../cart/useCart';
import { useCreateWishlist } from '../wishlist/useCreateWishlist';
import { useWishlist } from '../wishlist/useWishlist';

import Spinner from '../../ui/Spinner';
import SuccessToast from '../../ui/SuccessToast';
import ErrorToast from '../../ui/ErrorToast';
import Button from '../../ui/Button';

function ProductItems({ watch }) {
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const {
    name,
    price,
    imageCover,
    ratingsAverage,
    discountPercentage,
    brand: { brand },
    slug,
    id,
  } = watch || {};

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { createCartItem, isPending: isCartItemCreating } = useCreateCartItem();
  const { createWishlistItem, isPending: isWishlistItemCreating } =
    useCreateWishlist();

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
            <SuccessToast t={t}>Item Added to Wishlist</SuccessToast>
          ));
        },
        onError: () => {
          toast.error((t) => (
            <ErrorToast t={t}>Error while updating wishlist</ErrorToast>
          ));
        },
      }
    );
  }

  function handleProduct() {
    navigate(`/productdetails/${slug}/${id}`);
  }

  function handleAddToCart() {
    createCartItem(
      {
        watchId: id,
      },
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
    );
  }

  return (
    <motion.div className="min-w-72 max-w-72 min-h-96 rounded shadow-md overflow-hidden bg-secondary-default/90 text-contrastText-primary transition hover:shadow-lg ">
      {/* <!-- Product Image --> */}
      <div
        className="relative w-full h-72"
        // onClick={handleProduct}
      >
        <img
          src={imageCover}
          alt="Rolex Submariner"
          className="w-full h-full object-cover scale-75"
        />
        {/* <!-- Badge --> */}

        <span className="absolute top-2 left-2 backdrop-brightness-95 cursor-pointer text-green-600 text-xs font-semibold px-2 py-1 rounded-lg">
          {discountPercentage}% Off
        </span>

        <Button
          className={`absolute top-2 right-2 border border-highlight-default py-3 ${
            isInWishlist && 'pointer-events-none'
          }`}
          size="small"
          variant={'text'}
          rounded="full"
          onClick={handleCreateWishlist}
          // disabled={isInWishlist}
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
      </div>

      {/* <!-- Card Content --> */}
      <div className="py-2 px-4 h-full space-y-3">
        {/* <!-- Product Title --> */}
        <h2 className="text-lg line-clamp-1 font-medium">{name}</h2>
        <p className="text-lg contrast-0 capitalize">{brand}</p>

        <div className="flex items-center justify-between">
          {/* <!-- Price --> */}
          <p className="text-lg font-extrabold ">
            ₹{(price / (discountPercentage / 100)).toLocaleString()}
          </p>
          {/* <!-- Rating --> */}
          <div className="flex items-center justify-center ">
            <span className=" text-white flex items-center justify-center gap-0.5 bg-green-600  px-1.5 rounded-full text-xs ">
              {ratingsAverage}
              <HiStar className="text-white " size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* <!-- Card Actions --> */}
      <div className=" p-4 flex justify-between items-center gap-4">
        <Button
          className="w-1/2 flex items-center justify-center"
          // className=" border border-white text-white"
          rounded="small"
          onClick={handleAddToCart}
          size="medium"
          disabled={isInCart}
        >
          {isCartItemCreating ? (
            <Spinner small />
          ) : isInCart ? (
            'In Cart'
          ) : (
            'Add to Cart'
          )}
        </Button>

        <Button
          variant="secondary"
          size="medium"
          rounded="small"
          className="w-1/2"
          onClick={handleProduct}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

export default ProductItems;
