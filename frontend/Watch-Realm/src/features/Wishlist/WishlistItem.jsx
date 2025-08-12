import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiStar, HiTrash } from 'react-icons/hi2';
import { BsCartPlusFill, BsFillCartCheckFill } from 'react-icons/bs';

import { useCart } from '../Cart/useCart';
import { useCreateCartItem } from '../Cart/useCreateCartItem';
import { useDeleteWishlistItem } from './useDeleteWishlistItem';

import SuccessToast from '../../ui/SuccessToast';
import ErrorToast from '../../ui/ErrorToast';
import Button from '../../ui/Button';

function WishlistItem({ watch }) {
  const navigate = useNavigate();

  const [isInCart, setIsInCart] = useState(false);
  const { cart } = useCart();
  const { createCartItem } = useCreateCartItem();
  const { deleteWishlistItem } = useDeleteWishlistItem();

  const {
    name,
    price,
    imageCover,
    ratingsAverage,
    discountPercentage,
    slug,
    _id,
  } = watch?.watch || {};

  useEffect(
    function () {
      const inCart = cart?.data?.items?.some((c) => c.watch.id === _id);
      setIsInCart(inCart);
    },
    [cart?.data?.items, _id]
  );

  function handleProduct() {
    navigate(`/productdetails/${slug}/${_id}`);
  }

  function handleAddToCart() {
    createCartItem(
      { watchId: _id },
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

  function handleDeleteWishlistItem() {
    deleteWishlistItem(
      { itemId: watch?._id },
      {
        onSuccess: () => {
          toast.success((t) => (
            <SuccessToast t={t}>Item removed from wishlist</SuccessToast>
          ));
        },
        onError: () => {
          toast.error((t) => (
            <ErrorToast t={t}>Something went wrong</ErrorToast>
          ));
        },
      }
    );
  }

  return (
    <div className="grid sm:grid-cols-3 rounded-md shadow-md overflow-hidden bg-secondary-light text-contrastText-primary hover:shadow-lg">
      {/* <!-- Product Image --> */}
      <div className="relative w-full h-52 p-5" onClick={handleProduct}>
        <img
          src={imageCover}
          alt="Rolex Submariner"
          className="w-full h-full object-contain"
        />
      </div>

      {/* <!-- Card Content --> */}
      <div className="py-2 px-4 h-full space-y-1 grid content-center">
        {/* <!-- Product Title --> */}
        <h2 className="text-lg line-clamp-2 font-medium">{name}</h2>

        <div className="max-lg:flex items-center justify-between lg:space-y-1">
          {/* <!-- Price --> */}
          <p className="text-lg font-extrabold ">
            ₹{(price / (discountPercentage / 100)).toLocaleString()}
          </p>
          {/* <!-- Rating --> */}
          <div className="max-md:flex items-center justify-center w-fit ">
            <span className=" text-white flex items-center justify-center gap-0.5 bg-green-600  px-1.5 rounded-full text-xs ">
              {ratingsAverage}
              <HiStar className="text-white " size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* <!-- Card Actions --> */}
      <div className=" py-4 px-4 flex justify-end items-center gap-2">
        <Button
          variant="secondary"
          className="border border-highlight-dark text-accent-primary"
          rounded="small"
          onClick={handleAddToCart}
          size="medium"
          disabled={isInCart}
          animation={false}
        >
          {isInCart ? <BsFillCartCheckFill /> : <BsCartPlusFill />}
        </Button>
        <Button
          variant="danger"
          className="border border-highlight-dark"
          rounded="small"
          onClick={handleDeleteWishlistItem}
          size="medium"
          animation={false}
        >
          <HiTrash />
        </Button>
      </div>
    </div>
  );
}

export default WishlistItem;
