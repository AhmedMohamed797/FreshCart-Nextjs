"use client";

import Image from "next/image";
import homeSlide1 from "../../../assets/images/home-slider-1.png";
import homeSlide2 from "../../../assets/images/home-slider-2.png";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  {
    image: homeSlide1,
    title: "Fresh Products Delivered",
    titleBreak: "To Your Door",
    offer: "Get 20% Off for your first order",
  },
  {
    image: homeSlide2,
    title: "Groceries That Stay Fresh",
    titleBreak: "All Week Long",
    offer: "Save more on daily essentials",
  },
];

export default function HomeSlider() {
  return (
    <section className="home-slider">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000 }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-70 overflow-hidden lg:h-96">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 flex items-center from-primary-600/95 to-primary-600/45 bg-linear-to-r text-white">
                <div className="container space-y-4">
                  <h2 className="text-2xl font-bold sm:text-4xl">
                    {slide.title} <br /> {slide.titleBreak}
                  </h2>

                  <p>{slide.offer}</p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn text-primary-600 border-2 border-white bg-white hover:bg-gray-100"
                    >
                      Shop Now
                    </button>
                    <button
                      type="button"
                      className="btn hover:text-primary-600 border-2 border-white bg-transparent text-white hover:bg-white"
                    >
                      View Deals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
