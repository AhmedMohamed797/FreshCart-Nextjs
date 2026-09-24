import FeaturedProducts from "../components/FeaturedProducts";
import HomeCategories from "../components/HomeCategories";
import HomeFeatures from "../components/HomeFeatures";
import HomeSlider from "../components/HomeSlider";

export default function HomeScreen() {
  return (
    <>
      {/* SLider */}
      <HomeSlider />

      {/* Home Features */}
      <HomeFeatures />

      {/* Categories */}
      <HomeCategories />

      {/* Featured products */}
      <FeaturedProducts />
    </>
  );
}
