import { useState, useMemo, useCallback } from "react";

export interface IProductCard {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  inStock?: boolean;
  discount?: number;
  brand?: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  searchQuery: string;
  sortBy: "popularity" | "price-low" | "price-high" | "rating";
}

export interface UseProductFilterReturn {
  filters: FilterState;
  filteredProducts: IProductCard[];
  categories: string[];
  updateCategory: (category: string) => void;
  updatePriceRange: (min: number, max: number) => void;
  updateSearchQuery: (query: string) => void;
  updateSortBy: (sortBy: FilterState["sortBy"]) => void;
  resetFilters: () => void;
  totalProducts: number;
  activeFiltersCount: number;
  hasActiveFilters: boolean;
}

export const useProductFilter = (
  products?: IProductCard[],
): UseProductFilterReturn => {
  const safeProducts: IProductCard[] = products ?? [];

  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: [0, 1000],
    searchQuery: "",
    sortBy: "popularity",
  });

  const categories = useMemo(() => {
    if (safeProducts.length === 0) {
      return ["all"];
    }

    const productsWithCategory = safeProducts.filter(
      (p) => p?.category !== undefined && p.category !== null,
    );

    if (productsWithCategory.length === 0) {
      return ["all"];
    }

    const uniqueCategories = new Set(
      productsWithCategory.map((product) => product.category),
    );

    return ["all", ...Array.from(uniqueCategories)];
  }, [safeProducts]);

  const filteredProducts = useMemo(() => {
    if (safeProducts.length === 0) {
      return [];
    }

    let filtered = safeProducts.filter((product) => {
      if (!product) return false;

      const hasRequiredFields =
        product.id !== undefined &&
        product.title !== undefined &&
        product.price !== undefined &&
        product.category !== undefined;

      if (!hasRequiredFields) return false;

      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      if (
        typeof product.price !== "number" ||
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const title = (product.title || "").toLowerCase();
        const description = (product.description || "").toLowerCase();

        if (!title.includes(query) && !description.includes(query)) {
          return false;
        }
      }

      return true;
    });

    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case "popularity":
      default:
        filtered.sort(
          (a, b) => (b.rating?.count || 0) - (a.rating?.count || 0),
        );
        break;
    }

    return filtered;
  }, [safeProducts, filters]);

  const totalProducts = safeProducts.length;

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.searchQuery.trim()) count++;
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000) count++;
    return count;
  }, [filters]);

  const hasActiveFilters = activeFiltersCount > 0;

  const updateCategory = useCallback((category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const updatePriceRange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceRange: [min, max] }));
  }, []);

  const updateSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const updateSortBy = useCallback((sortBy: FilterState["sortBy"]) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      category: "all",
      priceRange: [0, 1000],
      searchQuery: "",
      sortBy: "popularity",
    });
  }, []);

  return {
    filters,
    filteredProducts,
    categories,
    updateCategory,
    updatePriceRange,
    updateSearchQuery,
    updateSortBy,
    resetFilters,
    totalProducts,
    activeFiltersCount,
    hasActiveFilters,
  };
};
