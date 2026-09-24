import {
  IconRotate,
  IconShieldHalf,
  IconTruckDelivery,
} from "@tabler/icons-react";

export default function ShippingTab() {
  return (
    <>
      <div className="space-y-8">
        <div>
          <div className="mb-4 flex items-center">
            <IconTruckDelivery
              stroke={2}
              className="text-primary-600 mr-2 h-6 w-6"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              Shipping Information
            </h3>
          </div>
          <div className="space-y-4">
            <div className="border-primary-200 bg-primary-50 rounded-lg border p-4">
              <h4 className="text-primary-900 mb-2 font-medium">
                Free Standard Shipping
              </h4>
              <p className="text-primary-800 text-sm">
                Orders over 500 EGP qualify for free standard shipping (5-7
                business days)
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-medium text-gray-900">
                  Express Shipping
                </h4>
                <p className="mb-1 text-sm text-gray-600">2-3 business days</p>
                <p className="font-semibold text-gray-900">12.99 EGP</p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-medium text-gray-900">
                  Next Day Delivery
                </h4>
                <p className="mb-1 text-sm text-gray-600">1 business day</p>
                <p className="font-semibold text-gray-900">24.99 EGP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 xl:flex-row">
          <div>
            <div className="mb-4 flex items-center">
              <IconRotate
                stroke={2}
                className="text-primary-600 mr-2 h-6 w-6"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                Returns & Exchanges
              </h3>
            </div>
            <div className="space-y-4">
              <div className="border-primary-200 bg-primary-50 rounded-lg border p-4">
                <h4 className="text-primary-900 mb-2 font-medium">
                  30-Day Return Policy
                </h4>
                <p className="text-primary-800 text-sm">
                  Return your item within 30 days for a full refund or exchange.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="mt-2 mr-3 h-2 w-2 shrink-0 rounded-full bg-gray-400"></div>
                  <span className="text-sm text-gray-700">
                    Items must be in original condition with all packaging
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="mt-2 mr-3 h-2 w-2 shrink-0 rounded-full bg-gray-400"></div>
                  <span className="text-sm text-gray-700">
                    Free return shipping on defective items
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="mt-2 mr-3 h-2 w-2 shrink-0 rounded-full bg-gray-400"></div>
                  <span className="text-sm text-gray-700">
                    Exchanges processed within 3-5 business days
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center">
              <IconShieldHalf
                stroke={2}
                className="text-primary-600 mr-2 h-6 w-6"
              />
              <h3 className="text-xl font-semibold text-gray-900">Warranty</h3>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-900">
                2-Year Limited Warranty
              </h4>
              <p className="mb-3 text-sm text-gray-700">
                This product is covered by a comprehensive 2-year warranty
                against manufacturing defects.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Covers manufacturing defects and material failures</li>
                <li>• Does not cover damage from misuse or normal wear</li>
                <li>
                  • Warranty registration required within 30 days of purchase
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
