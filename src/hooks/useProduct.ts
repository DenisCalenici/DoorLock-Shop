import { useCallback, useMemo } from "react";
import { fetchProductById } from "../api/product";
import { useProducts } from "../context/ProductsContext";
import type { IProductCard } from "./useProductFilter";
import { useAsyncData } from "./useAsyncData";

export const useProduct = (id: string | undefined) => {
  const { products, isLoading: listLoading, error: listError } = useProducts();
  const productId = id ? Number(id) : NaN;

  const cached = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId],
  );

  const fetcher = useCallback(
    () => fetchProductById(productId),
    [productId],
  );

  const remote = useAsyncData<IProductCard>(fetcher, [productId, fetcher], {
    enabled: !!id && !listLoading && !cached,
  });

  if (!id || Number.isNaN(productId)) {
    return {
      data: null,
      isLoading: false,
      error: "Некорректный идентификатор товара",
      reload: remote.reload,
      setData: remote.setData,
    };
  }

  if (cached) {
    return {
      data: cached,
      isLoading: false,
      error: listError,
      reload: remote.reload,
      setData: remote.setData,
    };
  }

  if (listLoading) {
    return {
      data: null,
      isLoading: true,
      error: listError,
      reload: remote.reload,
      setData: remote.setData,
    };
  }

  return remote;
};
