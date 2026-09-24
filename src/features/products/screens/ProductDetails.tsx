import ProductDetailsInfo from "../components/ProductDetails/ProductDetailsInfo";
import ProductDetailsTabs from "../components/ProductDetails/ProductDetailsTabs";
import RelatedProducts from "../components/ProductDetails/RelatedProduct";
import { getSpecificProduct } from "../services/getSpecificProduct";

export default async function ProductDetails({ id }: { id: string }) {
  const data = await getSpecificProduct({ id });

  return (
    <>
      <ProductDetailsInfo productDetails={data} />
      <ProductDetailsTabs productDetails={data} />
      <RelatedProducts productDetails={data} />
    </>
  );
}
