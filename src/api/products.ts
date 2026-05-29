import { fetchJson } from "./http";
import type { IProductCard } from "../hooks/useProductFilter";

const PRODUCTS_URL = "https://fakestoreapi.com/products";
const CATEGORIES_URL = "https://fakestoreapi.com/products/categories";

export interface CategoryItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  link: string;
}

export const fetchProducts = (): Promise<IProductCard[]> =>
  fetchJson<IProductCard[]>(PRODUCTS_URL);

export const fetchCategories = (): Promise<string[]> =>
  fetchJson<string[]>(CATEGORIES_URL);

export const mapCategoriesToItems = (data: string[]): CategoryItem[] =>
  data.slice(0, 4).map((cat, index) => ({
    id: index + 1,
    title: cat.charAt(0).toUpperCase() + cat.slice(1),
    slug: cat,
    image: `https://via.placeholder.com/400x225/4295E4/ffffff?text=${cat}`,
    link: `/catalog?category=${encodeURIComponent(cat)}`,
  }));
