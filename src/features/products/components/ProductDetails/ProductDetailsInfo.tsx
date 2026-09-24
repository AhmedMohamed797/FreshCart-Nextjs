"use client";

import Rating from "@/components/shared/Rating";
import {
  IconHeart,
  IconRotate,
  IconShoppingCartPlus,
  IconTruckDelivery,
} from "@tabler/icons-react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { ProductDetailsApiResponse } from "../../types/productDetails.types";
import { calcDiscount } from "../../utils/calcDiscount";

export default function ProductDetailsInfo({
  productDetails,
}: {
  productDetails: ProductDetailsApiResponse;
}) {
  const {
    data: {
      category,
      title,
      description,
      price,
      priceAfterDiscount,
      quantity,
      ratingsAverage,
      ratingsQuantity,
      images,
    },
  } = productDetails;

  return (
    <>
      <section className="pt-8">
        <div className="container bg-white">
          <div className="grid grid-cols-1 gap-13 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-4">
              <div className="w-full">
                <ImageGallery
                  showNav={false}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  autoPlay={true}
                  slideOnThumbnailOver={true}
                  infinite={true}
                  items={images.map((image: string) => ({
                    original: image,
                    thumbnail: image,
                  }))}
                />
              </div>
            </div>
            {/* Right Side - Product Info */}
            <div className="space-y-4 lg:col-span-8">
              {/* In Stock Badge */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`${quantity > 0 ? "bg-primary-200 text-primary-800" : "bg-red-200 text-red-800"} inline-flex items-center rounded-full px-3 py-1 text-sm font-medium`}
                >
                  {quantity > 0 ? "In Stock" : "Out Of Stock"}
                </span>

                <ul className="flex items-center gap-2 text-gray-500">
                  <button>
                    <IconHeart stroke={2} />
                  </button>
                </ul>
              </div>

              {/* Title */}
              <h1 className="text-3xl mb-0 font-bold text-gray-900">{title}</h1>
              <span className="text-sm bg-primary-600 text-white rounded-md px-1">
                {category.name}
              </span>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 text-gray-600">
                  <Rating rating={ratingsAverage} />
                  <span className="font-semibold">{ratingsAverage}</span>
                </div>
                <span className="font-semibold">
                  ({ratingsQuantity} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 sm:text-3xl">
                  {priceAfterDiscount || price} EGP
                </span>

                {priceAfterDiscount && (
                  <>
                    <del className="text-gray-500 sm:text-xl">{price} EGP</del>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                      {calcDiscount({ price, priceAfterDiscount })} % OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-gray-200 pt-4">
                <p className="leading-relaxed text-gray-600">{description}</p>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Quantity</span>
                  {quantity > 0 && (
                    <span className="text-sm text-gray-500">
                      Only {quantity} items left in stock
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <button className="btn hover:bg-primary-700 flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 text-white transition-colors duration-500">
                  <IconShoppingCartPlus stroke={2} />
                  Add to Cart
                </button>

                <button className="btn hover:bg-primary-600 text-primary-600 flex-1 rounded-lg border border-gray-300/50 bg-white px-6 py-3 transition-colors duration-500 hover:text-white">
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="flex flex-col gap-8 border-t border-gray-100 py-5 *:flex-1 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4 rounded-lg p-3">
                  <div className="text-primary-700 bg-primary-400/50 flex size-12 items-center justify-center rounded-full">
                    <IconTruckDelivery stroke={2} />
                  </div>
                  <div>
                    <h3 className="mb-0.5 font-semibold">Free Delivery</h3>
                    <p className="text-sm text-gray-500">
                      Orders 500 EGP or more
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg p-3">
                  <div className="text-primary-700 bg-primary-400/50 flex size-12 items-center justify-center rounded-full">
                    <IconRotate stroke={2} />
                  </div>
                  <div>
                    <h3 className="mb-0.5 font-semibold">30 Days Return</h3>
                    <p className="text-sm text-gray-500">
                      Satisfaction guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
