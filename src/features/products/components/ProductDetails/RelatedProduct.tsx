import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { ProductDetailsApiResponse } from "../../types/productDetails.types";
import RelatedProductsSwiper from "./RelatedProductsSwiper";

export default async function RelatedProducts({
  productDetails,
}: {
  productDetails: ProductDetailsApiResponse;
}) {
  const {
    data: { category },
  } = productDetails;

  const options: AxiosRequestConfig = {
    url: `/products?category[in]=${category._id}`,
    method: "GET",
  };

  const {
    data: { data },
  } = await apiClient.request(options);

  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section className="border-t border-gray-200 bg-gray-50/80 py-8">
      <div className="container">
        <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-700">
              Recommended
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              You May Also Like
            </h2>
          </div>
        </div>

        <RelatedProductsSwiper products={data} />
      </div>
    </section>
  );
}
