import { useCart } from "../context/CartContext";
import type { IProductCard } from "../hooks/useProductFilter";

export const useCartActions = () => {
  const { addToCart, openBasket } = useCart();

  const addProductToCart = (
    product: IProductCard,
    options?: { openBasket?: boolean },
  ) => {
    addToCart(product);
    if (options?.openBasket !== false) {
      openBasket();
    }
  };

  const handleAddToBasket = (
    e: React.MouseEvent,
    product: IProductCard,
    options?: { openBasket?: boolean },
  ) => {
    e.preventDefault();
    e.stopPropagation();
    addProductToCart(product, options);
  };

  return { handleAddToBasket, addProductToCart, addToCart, openBasket };
};
