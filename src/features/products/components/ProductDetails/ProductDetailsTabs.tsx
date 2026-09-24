"use client";

import { useState } from "react";
import { ProductDetailsApiResponse } from "../../types/productDetails.types";
import ProductInfoTab from "./ProductInfoTab";
import ReviewsTab from "./ReviewsTab";
import ShippingTab from "./ShippingTab";

export default function ProductDetailsTabs({
  productDetails,
}: {
  productDetails: ProductDetailsApiResponse;
}) {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { id: "details", label: "Product Details" },
    { id: "reviews", label: "Reviews" },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  return (
    <div className="container p-6">
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-1 py-4 text-sm font-semibold transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === "details" && (
          <ProductInfoTab productDetails={productDetails} />
        )}
        {activeTab === "reviews" && (
          <ReviewsTab productDetails={productDetails} />
        )}
        {activeTab === "shipping" && <ShippingTab />}
      </div>
    </div>
  );
}
