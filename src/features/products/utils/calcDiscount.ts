export function calcDiscount({
  price,
  priceAfterDiscount,
}: {
  price: number;
  priceAfterDiscount: number;
}) {
  return (((price - priceAfterDiscount) / price) * 100).toFixed(0);
}
