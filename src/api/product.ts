import { fetchJson } from "./http";
import type { IProductCard } from "../hooks/useProductFilter";

export const fetchProductById = (id: number): Promise<IProductCard> =>
  fetchJson<IProductCard>(`https://fakestoreapi.com/products/${id}`);
