import Rating from "@/components/shared/Rating";
import { ProductDetailsApiResponse } from "../../types/productDetails.types";

export default function ReviewsTab({
  productDetails,
}: {
  productDetails: ProductDetailsApiResponse;
}) {
  const {
    data: { reviews, ratingsAverage, ratingsQuantity },
  } = productDetails;

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Customer Reviews
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex">
              <Rating rating={ratingsAverage} />
            </div>
            <span className="text-sm text-gray-600">
              {ratingsAverage} out of 5 ({ratingsQuantity} reviews)
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {review.user.name}
                  </h4>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="flex">
                      <Rating rating={review.rating} />
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="leading-relaxed text-gray-700">{review.review}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary-50 mt-8 rounded-lg p-4">
          <p className="text-primary-800 text-sm">
            <strong>Write a review:</strong> Share your experience with other
            customers. Your feedback helps others make informed decisions about
            product quality, sizing, and authenticity.
          </p>
        </div>
      </div>
    </>
  );
}
