import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { IProductCard } from "../hooks/useProductFilter";
import type { BasketItem } from "../types/Basket.type";

interface CartItem extends IProductCard {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  basketItems: BasketItem[];
  addToCart: (product: IProductCard) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isBasketOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const cartItemToBasketItem = (item: CartItem): BasketItem => ({
  id: item.id,
  name: item.title,
  price: item.price,
  quantity: item.quantity,
  image: item.image,
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const basketItems = useMemo(
    () => cartItems.map(cartItemToBasketItem),
    [cartItems],
  );

  const addToCart = (product: IProductCard) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const value: CartContextType = {
    cartItems,
    basketItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    isBasketOpen,
    openBasket: () => setIsBasketOpen(true),
    closeBasket: () => setIsBasketOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
