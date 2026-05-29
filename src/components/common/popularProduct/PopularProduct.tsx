import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { LuChevronLeft, LuChevronRight, LuGift } from "react-icons/lu";
import { useProducts } from "../../../context/ProductsContext";
import { useCartActions } from "../../../hooks/useCartAction";
import { AsyncStateGate } from "../asyncState";
import StarRating from "../StarRating/StarRating";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { formatPrice, formatPriceRounded } from "../../../utils/formatPrice";
import iconStyles from "../icons/ActionIcons.module.css";
import s from "./PopularProduct.module.css";

const POPULAR_LIMIT = 8;

const PopularProduct: React.FC = () => {
  const { products, isLoading, error } = useProducts();
  const { addProductToCart } = useCartActions();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const popularItems = useMemo(
    () =>
      [...products]
        .sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0))
        .slice(0, POPULAR_LIMIT),
    [products],
  );

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  const wrapPopular = (content: React.ReactNode) => (
    <div className={s.popular_container}>{content}</div>
  );

  return (
    <AsyncStateGate
      isLoading={isLoading}
      error={error}
      loadingMessage="Загрузка популярных продуктов..."
      wrap={wrapPopular}
    >
      <>
        <div className={s.popular_header}>
          <h2>Наши популярные продукты</h2>
        </div>

        <section className={s.popular_section}>
          <div className={s.popular_catalog_container}>
            <div className={s.popular_products_wrapper}>
              <button
                type="button"
                className={`${s.scrollButton} ${s.scrollButtonLeft}`}
                onClick={scrollLeft}
                aria-label="Прокрутить влево"
              >
                <LuChevronLeft size={24} strokeWidth={2} />
              </button>

              <div
                className={s.popular_products_scroll_container}
                ref={scrollContainerRef}
              >
                <div className={s.popular_products_grid}>
                  {popularItems.map((product) => (
                    <div key={product.id} className={s.productCard}>
                      <Link
                        to={`/product/${product.id}`}
                        className={s.productImageLink}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className={s.productImage}
                        />
                      </Link>

                      <FavoriteButton
                        productId={product.id}
                        className={s.favoriteButton}
                      />

                      <div className={s.availability}>
                        <span className={s.availabilityText}>В наличии</span>
                      </div>

                      <button
                        type="button"
                        className={s.compareButton}
                        onClick={() => addProductToCart(product)}
                      >
                        В корзину
                      </button>

                      <button type="button" className={s.giftButton}>
                        <LuGift
                          size={14}
                          strokeWidth={1.75}
                          className={iconStyles.gift_icon}
                        />
                        В подарок
                      </button>

                      <div className={s.productInfo}>
                        <Link
                          to={`/product/${product.id}`}
                          className={s.productNameLink}
                        >
                          <h3 className={s.productName}>{product.title}</h3>
                        </Link>

                        <div className={s.reviewsBlock}>
                          <div className={s.rating}>
                            <StarRating
                              rate={product.rating?.rate ?? 5}
                              size={15}
                            />
                          </div>
                          <span className={s.reviewsCount}>
                            {product.rating?.count ?? 0} отзывов
                          </span>
                        </div>

                        <div className={s.priceBlock}>
                          <span className={s.currentPrice}>
                            {formatPrice(product.price)}
                          </span>
                          <span className={s.oldPrice}>
                            {formatPriceRounded(product.price, 1.2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className={`${s.scrollButton} ${s.scrollButtonRight}`}
                onClick={scrollRight}
                aria-label="Прокрутить вправо"
              >
                <LuChevronRight size={24} strokeWidth={2} />
              </button>
            </div>
          </div>
        </section>
      </>
    </AsyncStateGate>
  );
};

export default PopularProduct;
