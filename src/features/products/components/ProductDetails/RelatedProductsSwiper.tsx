"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "../../types/products.types";
import ProductCard from "../ProductCard";

export default function RelatedProductsSwiper({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Previous products"
          className="related-prev-btn flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-200 hover:border-primary-600 hover:text-primary-600"
        >
          <IconChevronLeft stroke={2.5} size={20} />
        </button>

        <button
          type="button"
          aria-label="Next products"
          className="related-next-btn flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-200 hover:border-primary-600 hover:text-primary-600"
        >
          <IconChevronRight stroke={2.5} size={20} />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={products.length > 4}
        navigation={{
          nextEl: ".related-next-btn",
          prevEl: ".related-prev-btn",
        }}
        watchOverflow={true}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 4, spaceBetween: 18 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
        }}
        className="pb-2!"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-auto!">
            <div className="h-full">
              <ProductCard productInfo={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
