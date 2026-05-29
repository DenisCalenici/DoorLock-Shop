import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { fetchProducts } from "../api/products";
import type { IProductCard } from "../hooks/useProductFilter";
import { useAsyncData } from "../hooks/useAsyncData";

interface ProductsContextType {
  products: IProductCard[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error, reload } = useAsyncData<IProductCard[]>(
    fetchProducts,
    [],
  );

  const value: ProductsContextType = {
    products: data ?? [],
    isLoading,
    error,
    reload,
  };

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
};
