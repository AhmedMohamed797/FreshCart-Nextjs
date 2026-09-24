import { ProductDetailsApiResponse } from "../../types/productDetails.types";

export default function ProductInfoTab({
  productDetails,
}: {
  productDetails: ProductDetailsApiResponse;
}) {
  const {
    data: { description, brand, category, quantity },
  } = productDetails;

  return (
    <>
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Description
          </h3>
          <p className="leading-relaxed text-gray-700">{description}</p>
        </div>

        <div className="flex flex-col gap-15 xl:flex-row">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Benefits
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-primary-600 mt-2 mr-3 h-2 w-2 shrink-0 rounded-full"></div>
                <span className="text-gray-700">
                  Premium quality materials and branded products
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-600 mt-2 mr-3 h-2 w-2 shrink-0 rounded-full"></div>
                <span className="text-gray-700">
                  30-day return policy with hassle-free exchanges
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-600 mt-2 mr-3 h-2 w-2 shrink-0 rounded-full"></div>
                <span className="text-gray-700">
                  Official warranty and after-sales support
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-primary-600 mt-2 mr-3 h-2 w-2 shrink-0 rounded-full"></div>
                <span className="text-gray-700">
                  Fast delivery across Egypt with secure packaging
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Product Details
            </h3>
            <div>
              <div className="grid grid-cols-1 gap-4 gap-x-10 md:grid-cols-2">
                <div>
                  <span className="font-semibold text-gray-900">
                    Categories:
                  </span>
                  <span className="ml-2 text-gray-700">{category.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Brand:</span>
                  <span className="ml-2 text-gray-700">{brand.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Warranty:</span>
                  <span className="ml-2 text-gray-700">1 Year Warranty</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Availability:
                  </span>
                  <span className="ml-2 text-gray-700">
                    {quantity > 0 ? "In Stock" : "Out Of Stock"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Payment Options:
                  </span>
                  <span className="ml-2 text-gray-700">
                    Card, Cash on Delivery
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Shipping:</span>
                  <span className="ml-2 text-gray-700">
                    Express Delivery Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
