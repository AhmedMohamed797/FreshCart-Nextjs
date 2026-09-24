import ProductCard from "@/features/products/components/ProductCard";
import { getAllProducts } from "@/features/products/services/getAllProducts";

export default async function FeaturedProducts() {
  const products = await getAllProducts();

  return (
    <>
      <section className="py-10">
        <div className="container">
          <h2 className="relative flex items-center gap-3 text-2xl font-bold before:block before:h-10 before:w-1 before:bg-primary-600 before:content-['']">
            <span>Featured</span>
            <span className="text-primary-600 font-bold">Products</span>
          </h2>
          <div className="grid gap-5 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.data.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
