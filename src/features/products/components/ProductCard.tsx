import Rating from "@/components/shared/Rating";
import { IconEye, IconHeart, IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/products.types";
import { calcDiscount } from "../utils/calcDiscount";

export default function ProductCard({ productInfo }: { productInfo: Product }) {
  const {
    id,
    category,
    imageCover,
    price,
    ratingsAverage,
    ratingsQuantity,
    title,
    priceAfterDiscount,
  } = productInfo;

  return (
    <>
      <div className="card relative overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="relative h-60">
          <Link
            href={`/products/${id}`}
            className="relative block h-full w-full"
          >
            <Image
              src={imageCover}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain"
            />
          </Link>
        </div>

        <div className="content space-y-2 p-4">
          <div className="head-content">
            <span className="text-sm text-gray-500">{category.name}</span>
            <h2 className="line-clamp-1 font-medium">
              <Link
                href={`/products/${id}`}
                className="line-clamp-1"
                title={title}
              >
                {title}
              </Link>
            </h2>
          </div>

          <div className="rating flex items-center gap-2">
            <Rating rating={ratingsAverage} />
            <div className="space-x-1">
              <span>{ratingsAverage}</span>
              <span>({ratingsQuantity})</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="price space-x-2">
              <span className="text-primary-600 text-lg font-semibold">
                {priceAfterDiscount || price} EGP
              </span>

              {priceAfterDiscount && (
                <del className="text-sm text-gray-500">{price} EGP</del>
              )}
            </div>

            <button className="btn hover:bg-primary-700 flex justify-center items-center bg-primary-600 size-9 rounded-full p-0 text-white">
              <IconPlus stroke={2} />
            </button>
          </div>
        </div>

        <div className="actions *:hover:text-primary-600 absolute top-4 right-4 flex flex-col gap-4 text-gray-500 *:transition-colors *:duration-200">
          <button>
            <IconHeart stroke={2} />
          </button>
          <button>
            <Link href={`/products/${id}`}>
              <IconEye stroke={2} />
            </Link>
          </button>
        </div>

        {priceAfterDiscount && (
          <span className="badge absolute top-4 left-4 rounded-md bg-red-500 px-2 py-1 text-white">
            -{calcDiscount({ price, priceAfterDiscount })}%
          </span>
        )}
      </div>
    </>
  );
}
