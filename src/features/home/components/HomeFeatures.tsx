import {
  IconHeadset,
  IconRotate2,
  IconShieldHalf,
  IconTruckDelivery,
} from "@tabler/icons-react";

export default function HomeFeatures() {
  return (
    <>
      <section className="bg-white py-10">
        <div className="container px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-lg border border-gray-100 p-4">
              <div className="bg-primary-100 text-primary-700 flex size-12 items-center justify-center rounded-full">
                <IconTruckDelivery stroke={2} color="currentColor" />
              </div>
              <div>
                <h3 className="mb-0.5 font-semibold">Free Delivery</h3>
                <p className="text-sm text-gray-500">Orders $50 or more</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-gray-100 p-4">
              <div className="bg-amber-100 text-amber-700 flex size-12 items-center justify-center rounded-full">
                <IconRotate2 stroke={2} color="currentColor" />
              </div>
              <div>
                <h3 className="mb-0.5 font-semibold">30 Days Return</h3>
                <p className="text-sm text-gray-500">Satisfaction guaranteed</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-gray-100 p-4">
              <div className="bg-emerald-100 text-emerald-700 flex size-12 items-center justify-center rounded-full">
                <IconShieldHalf stroke={2} color="currentColor" />
              </div>
              <div>
                <h3 className="mb-0.5 font-semibold">Secure Payment</h3>
                <p className="text-sm text-gray-500">100% protected checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-lg border border-gray-100 p-4">
              <div className="bg-violet-100 text-violet-700 flex size-12 items-center justify-center rounded-full">
                <IconHeadset stroke={2} color="currentColor" />
              </div>
              <div>
                <h3 className="mb-0.5 font-semibold">24/7 Support</h3>
                <p className="text-sm text-gray-500">Ready to help anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
