import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHeart, HiStar } from 'react-icons/hi2';
import toast from 'react-hot-toast';

import { useCreateCartItem } from '../Cart/useCreateCartItem';
import { useCart } from '../Cart/useCart';
import { useCreateWishlist } from '../Wishlist/useCreateWishlist';
import { useWishlist } from '../Wishlist/useWishlist';
import { useUser } from '../User/useUser';

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

  const { isAuthenticated } = useUser();
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
    <motion.div className="w-72 min-h-96 rounded shadow-md overflow-hidden bg-secondary-default text-black/90 transition hover:shadow-lg border border-highlight-default">
      {/* <!-- Product Image --> */}
      <div className="relative w-full h-72">
        <img
          src={imageCover}
          alt="Rolex Submariner"
          className="w-full h-full object-cover scale-75"
          onClick={handleProduct}
          loading="lazy"
        />
        {/* <!-- Badge --> */}

        <span className="absolute top-2 left-2 backdrop-brightness-90 cursor-pointer text-green-600 text-xs font-semibold px-2 py-1 rounded-lg">
          {discountPercentage}% Off
        </span>

        <Button
          className={`absolute top-2 right-2 border border-highlight-dark py-3 ${
            (isInWishlist || !isAuthenticated) && 'pointer-events-none'
          }`}
          size="small"
          variant={'text'}
          rounded="full"
          onClick={handleCreateWishlist}
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

      {/* <!-- Card Content --> */}
      <div className="py-2 px-4 h-full space-y-1">
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
