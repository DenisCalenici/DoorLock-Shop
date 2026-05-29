import React, { useState, useEffect } from "react";
import s from "./Main.module.css";
import Numbers from "../Numbers/Numbers";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import PopularProduct from "../common/popularProduct/PopularProduct";
import Categories from "../Categories";
import { useProducts } from "../../context/ProductsContext";
import { useCartActions } from "../../hooks/useCartAction";
import { AsyncStateGate } from "../common/asyncState";
import type { IProductCard } from "../../hooks/useProductFilter";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { formatPrice, formatPriceRounded } from "../../utils/formatPrice";

interface MainProductShowcaseProps {
  products: IProductCard[];
}

const MainProductShowcase = ({ products }: MainProductShowcaseProps) => {
  const { handleAddToBasket } = useCartActions();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= products.length) {
      setCurrentIndex(0);
    }
  }, [products.length, currentIndex]);

  const currentProduct = products[currentIndex];

  if (!currentProduct) {
    return null;
  }

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) =>
      prev < products.length - 1 ? prev + 1 : 0,
    );
  };

  return (
    <>
      <section className={s.main_section}>
        <div className={s.main_catalog_container}>
          <div className={s.productCenterWrapper}>
            <button
              type="button"
              className={`${s.nav_button} ${s.nav_button_prev}`}
              onClick={showPrevious}
              aria-label="Предыдущий товар"
            >
              <LuChevronLeft size={28} strokeWidth={2} />
            </button>

            <div className={s.productCard}>
              <div className={s.productImageLeft}>
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className={s.productImage}
                />
              </div>

              <div className={s.productInfoRight}>
                <h3 className={s.productName}>{currentProduct.title}</h3>

                <p className={s.productDescription}>
                  {currentProduct.description
                    ? `${currentProduct.description.substring(0, 150)}...`
                    : "Описание товара временно отсутствует"}
                </p>

                <div className={s.priceBlock}>
                  <span className={s.currentPrice}>
                    {formatPrice(currentProduct.price)}
                  </span>
                  <span className={s.oldPrice}>
                    {formatPriceRounded(currentProduct.price, 1.2)}
                  </span>
                </div>

                <button
                  className={s.addToCartButton}
                  onClick={(e) => handleAddToBasket(e, currentProduct)}
                >
                  Добавить в корзину
                </button>
              </div>
            </div>

            <button
              type="button"
              className={`${s.nav_button} ${s.nav_button_next}`}
              onClick={showNext}
              aria-label="Следующий товар"
            >
              <LuChevronRight size={28} strokeWidth={2} />
            </button>
          </div>

          <div className={s.productCounter}>
            {currentIndex + 1} / {products.length}
          </div>
        </div>
      </section>
      <section>
        <Numbers />
        <WhyChooseUs />
        <Categories />
        <PopularProduct />
      </section>
    </>
  );
};

const Main: React.FC = () => {
  const { products, isLoading, error } = useProducts();

  const wrapMain = (content: React.ReactNode) => (
    <div className={s.main_container}>{content}</div>
  );

  const hasProducts = !isLoading && !error && products.length > 0;

  return (
    <AsyncStateGate
      isLoading={isLoading}
      error={error}
      loadingMessage="Загрузка продуктов..."
      isEmpty={!isLoading && !error && products.length === 0}
      empty={{
        title: "Каталог пуст",
        message: "Товары временно отсутствуют",
      }}
      wrap={wrapMain}
    >
      {hasProducts ? <MainProductShowcase products={products} /> : null}
    </AsyncStateGate>
  );
};

export default Main;
