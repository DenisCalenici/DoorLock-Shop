import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import s from "./ProductPage.module.css";
import { Link } from "react-router-dom";
import { useCartActions } from "../../hooks/useCartAction";
import PopularProduct from "../common/popularProduct/PopularProduct";
import Ceo from "../common/ceo/Ceo";
import { useProduct } from "../../hooks/useProduct";
import { AsyncStateGate } from "../common/asyncState";
import StarRating from "../common/StarRating/StarRating";
import FavoriteButton from "../common/FavoriteButton/FavoriteButton";
import { formatPrice, formatPriceRounded } from "../../utils/formatPrice";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedComplection, setSelectedComplection] = useState("base");

  const { addProductToCart } = useCartActions();

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  const handleAccordionToggle = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const layoutTitle = isLoading
    ? "Загрузка..."
    : error
      ? "Ошибка"
      : !product
        ? "Товар не найден"
        : product.title;

  const accordionSections = [
    {
      id: "payment",
      title: "💳 Оплата",
      content:
        "Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении",
    },
    {
      id: "installation",
      title: "🚚 Монтаж и доставка",
      content:
        "Бесплатная доставка по городу при заказе от 5000₽. Стоимость доставки за пределы города - 500₽. Профессиональная установка - 1500₽. Выезд мастера в течение 24 часов после получения заказа.",
    },
    {
      id: "guarantee",
      title: "🛡️ Гарантия и выгода",
      content:
        "Гарантия на товар - 1 год. Обмен и возврат в течение 14 дней. При покупке комплекта замок + установка - скидка 10%. На все замки распространяется гарантия производителя.",
    },
  ];

  return (
    <Layout title={layoutTitle}>
      <AsyncStateGate
        isLoading={isLoading}
        error={error}
        loadingMessage="Загружаем информацию о товаре..."
        fullHeight
        retryAction="back"
        isEmpty={!product}
        empty={{
          title: "Товар не найден",
          message: "Проверьте ссылку или вернитесь в каталог",
          actionLabel: "Вернуться назад",
          onAction: () => window.history.back(),
        }}
      >
      {product && (
        <>
          <div className={s.product_page}>
            <div className={s.product_page_container}>
              <div className={s.product_images}>
                <div className={s.product_info}>
                  <img
                    className={s.product_main_image}
                    src={selectedImage}
                    alt={product.title}
                  />
                </div>
              </div>

              <div className={s.product_details}>
                <div className={s.rating_block}>
                  <StarRating
                    rate={product.rating?.rate ?? 0}
                    size={18}
                  />
                  <span className={s.rating_text}>
                    {product.rating?.rate || 0} / 5
                  </span>
                  <span className={s.reviews_count}>
                    ({product.rating?.count || 0} отзывов)
                  </span>
                </div>

                <h1 className={s.product_title}>{product.title}</h1>

                <div className={s.product_category}>
                  Категория: <span>{product.category}</span>
                </div>

                <div className={s.availability}>
                  <span className={s.availability_dot}>●</span>
                  <span className={s.availability_text}>В наличии</span>
                </div>

                <div className={s.installation_options}>
                  <h3 className={s.installation_title}>
                    Подходит для установки на:
                  </h3>
                  <div className={s.checkbox_group}>
                    <label className={s.checkbox_label}>
                      <input type="checkbox" />
                      <span>Деревянная дверь</span>
                    </label>
                    <label className={s.checkbox_label}>
                      <input type="checkbox" />
                      <span>Металлическая дверь</span>
                    </label>
                    <label className={s.checkbox_label}>
                      <input type="checkbox" />
                      <span>Межкомнатная дверь</span>
                    </label>
                  </div>
                </div>

                <div className={s.complection}>
                  <h3 className={s.complection_title}>Комплектация:</h3>
                  <div className={s.complection_options}>
                    <button
                      type="button"
                      className={`${s.complection_button} ${
                        selectedComplection === "base" ? s.complection_active : ""
                      }`}
                      onClick={() => setSelectedComplection("base")}
                    >
                      Smart замок без приложения
                    </button>
                    <button
                      type="button"
                      className={`${s.complection_button} ${
                        selectedComplection === "app" ? s.complection_active : ""
                      }`}
                      onClick={() => setSelectedComplection("app")}
                    >
                      Smart замок с приложением +$10
                    </button>
                    <button
                      type="button"
                      className={`${s.complection_button} ${
                        selectedComplection === "wifi" ? s.complection_active : ""
                      }`}
                      onClick={() => setSelectedComplection("wifi")}
                    >
                      Комплект с Wi-Fi модулем +$20
                    </button>
                  </div>
                </div>

                <div className={s.price_section}>
                  <div className={s.current_price}>
                    {formatPrice(product.price)}
                  </div>
                  <div className={s.old_price}>
                    {formatPriceRounded(product.price, 1.3)}
                  </div>
                  <div className={s.discount_badge}>-30%</div>
                </div>

                <div className={s.action_buttons}>
                  <Link
                    to={`/checkout/${product.id}`}
                    className={s.buy_button}
                  >
                    Купить сейчас
                  </Link>
                  <button
                    type="button"
                    className={s.cart_button}
                    onClick={() => addProductToCart(product)}
                  >
                    В корзину
                  </button>
                  <FavoriteButton
                    productId={product.id}
                    className={s.favorite_action}
                    size={20}
                    showLabel
                  />
                </div>

                <div className={s.accordion_section}>
                  {accordionSections.map((section) => (
                    <div key={section.id} className={s.accordion_item}>
                      <button
                        type="button"
                        onClick={() => handleAccordionToggle(section.id)}
                        className={`${s.accordion_button} ${
                          activeAccordion === section.id
                            ? s.accordion_button_active
                            : ""
                        }`}
                        aria-expanded={activeAccordion === section.id}
                      >
                        <span className={s.accordion_title}>
                          {section.title}
                        </span>
                        <span className={s.accordion_icon}>
                          {activeAccordion === section.id ? "−" : "+"}
                        </span>
                      </button>
                      {activeAccordion === section.id && (
                        <div className={s.accordion_content}>
                          <p className={s.accordion_text}>{section.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={s.additional_blocks}></div>
          </div>
          <PopularProduct />
          <Ceo />
        </>
      )}
      </AsyncStateGate>
    </Layout>
  );
};

export default ProductPage;
