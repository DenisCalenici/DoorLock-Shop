import React from "react";
import { Link } from "react-router-dom";
import { LuGift } from "react-icons/lu";
import { IProductCard } from "../../../hooks/useProductFilter";
import StarRating from "../../common/StarRating/StarRating";
import FavoriteButton from "../../common/FavoriteButton/FavoriteButton";
import { formatPrice, formatPriceRounded } from "../../../utils/formatPrice";
import iconStyles from "../../common/icons/ActionIcons.module.css";
import s from "./ProductList.module.css";

interface ProductListProps {
  products: IProductCard[];
  addToBasket: (product: IProductCard) => void;
  onProductClick?: (product: IProductCard) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  addToBasket,
  onProductClick,
}) => {
  if (!products || products.length === 0) {
    return (
      <div className={s.empty_product_list}>
        <p>Товары не найдены</p>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className={s.productCard}>
          <Link to={`/product/${product.id}`} className={s.productLink}>
            <img
              src={product.image}
              alt={product.title}
              className={s.productImage}
              onClick={() => onProductClick?.(product)}
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
            className={s.compareButton}
            onClick={() => addToBasket(product)}
          >
            SALE
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
            <Link to={`/product/${product.id}`} className={s.productNameLink}>
              <h3 className={s.productName}>{product.title}</h3>
            </Link>

            <div className={s.reviewsBlock}>
              <div className={s.rating}>
                <StarRating rate={product.rating?.rate ?? 5} size={15} />
              </div>
              <span className={s.reviewsCount}>
                {product.rating?.count || 0} отзывов
              </span>
            </div>

            <div className={s.priceBlock}>
              <span className={s.currentPrice}>{formatPrice(product.price)}</span>
              {product.discount ? (
                <span className={s.oldPrice}>
                  {formatPriceRounded(
                    product.price,
                    1 + product.discount / 100,
                  )}
                </span>
              ) : (
                <span className={s.oldPrice}>
                  {formatPriceRounded(product.price, 1.2)}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
