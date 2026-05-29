import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import FilterProduct from "./filters/Filter";
import ProductList from "./product/ProductList";
import s from "./Catalog.module.css";
import Ceo from "../common/ceo/Ceo";
import {
  useProductFilter,
  type IProductCard,
} from "../../hooks/useProductFilter";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import { AsyncStateGate } from "../common/asyncState";
import { LuSearch } from "react-icons/lu";
import iconStyles from "../common/icons/ActionIcons.module.css";

interface CatalogProps {
  title?: string;
  onProductClick?: (product: IProductCard) => void;
}

type FilterState = ReturnType<typeof useProductFilter>["filters"];

const Catalog: React.FC<CatalogProps> = ({
  title = "Накладные электронные замки",
  onProductClick,
}) => {
  const { products, isLoading, error } = useProducts();
  const { addToCart, openBasket } = useCart();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const addToBasket = (product: IProductCard) => {
    addToCart(product);
    openBasket();
  };

  const {
    filters,
    filteredProducts,
    categories,
    updateCategory,
    updatePriceRange,
    updateSearchQuery,
    updateSortBy,
    resetFilters,
    activeFiltersCount,
    hasActiveFilters,
  } = useProductFilter(products);

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    if (categoryFromUrl) {
      updateCategory(categoryFromUrl);
    }
  }, [categoryFromUrl, updateCategory]);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  return (
    <Layout title="Каталог">
      <AsyncStateGate
        isLoading={isLoading}
        error={error}
        loadingMessage="Загрузка каталога..."
        fullHeight
        isEmpty={!products.length}
        empty={{
          title: "Каталог пуст",
          message: "Товары временно отсутствуют",
        }}
      >
      <section>
        <div className={s.catalog_container}>
          <div className={s.catalog_header}>
            <h1 className={s.h1}>
              {title} ({filteredProducts.length})
            </h1>
          </div>

          <div className={s.catalog_controls}>
            <button
              className={`${s.button} ${s.reset_button} ${
                !hasActiveFilters ? s.button_disabled : ""
              }`}
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              title="Сбросить все фильтры"
            >
              Сбросить фильтры
              {hasActiveFilters && <span className={s.reset_badge}></span>}
            </button>
            {hasActiveFilters && (
              <span className={s.active_filters_badge}>
                Активных фильтров: {activeFiltersCount}
              </span>
            )}
            <div className={s.sort_container}>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) =>
                  updateSortBy(e.target.value as FilterState["sortBy"])
                }
                className={s.sort_select}
                aria-label="Выберите тип сортировки"
              >
                <option value="popularity">По популярности</option>
                <option value="price-low">Сначала дешевые</option>
                <option value="price-high">Сначала дорогие</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>

          <div className={s.filter_body}>
            <div
              className={`${s.catalog_filter} ${
                isFiltersOpen ? s.filter_open : ""
              }`}
              role="complementary"
              aria-label="Фильтры товаров"
            >
              <FilterProduct
                filters={filters}
                categories={categories}
                onCategoryChange={updateCategory}
                onPriceRangeChange={updatePriceRange}
                onSearchChange={updateSearchQuery}
                onSortChange={updateSortBy}
                onReset={resetFilters}
                onClose={() => setIsFiltersOpen(false)}
              />
            </div>

            <div className={s.catalog_content} role="main">
              <div className={s.filter_info}>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className={s.clear_filters_button}
                    aria-label="Очистить все фильтры"
                  >
                    Очистить фильтры
                  </button>
                )}
              </div>

              {currentProducts.length === 0 ? (
                <div className={s.no_results} role="alert">
                  <div className={s.no_results_icon}>
                    <LuSearch
                      size={48}
                      strokeWidth={1.5}
                      className={iconStyles.search_icon}
                    />
                  </div>
                  <h3 className={s.no_results_title}>Товары не найдены</h3>
                  <p className={s.no_results_text}>
                    Попробуйте изменить параметры фильтров или сбросить их
                  </p>
                  <button
                    onClick={resetFilters}
                    className={`${s.button} ${s.no_results_button}`}
                  >
                    Сбросить все фильтры
                  </button>
                </div>
              ) : (
                <>
                  <div className={s.products_grid}>
                    <ProductList
                      products={currentProducts}
                      addToBasket={addToBasket}
                      onProductClick={onProductClick}
                    />
                  </div>

                  {totalPages > 1 && (
                    <div className={s.pagination}>
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={s.pagination_arrow}
                        aria-label="Предыдущая страница"
                      >
                        ←
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <button
                            key={number}
                            onClick={() => goToPage(number)}
                            className={`${s.pagination_number} ${
                              currentPage === number ? s.pagination_active : ""
                            }`}
                            aria-label={`Страница ${number}`}
                            aria-current={
                              currentPage === number ? "page" : undefined
                            }
                          >
                            {number}
                          </button>
                        ),
                      )}

                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={s.pagination_arrow}
                        aria-label="Следующая страница"
                      >
                        →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

        <Ceo />
      </AsyncStateGate>
    </Layout>
  );
};

export default Catalog;
