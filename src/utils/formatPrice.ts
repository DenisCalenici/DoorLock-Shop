/** Fake Store API возвращает цены в USD */
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export const formatPriceRounded = (price: number, multiplier = 1): string =>
  formatPrice(Math.round(price * multiplier * 100) / 100);
