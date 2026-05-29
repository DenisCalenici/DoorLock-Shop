import { LuHeart, LuPhone, LuShoppingBag } from "react-icons/lu";
import logo from "../../../public/image/Logo.png";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Basket from "../Basket/Basket";

const Header = () => {
  const {
    basketItems,
    getTotalItems,
    isBasketOpen,
    openBasket,
    closeBasket,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "unset";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleOpenBasket = (e: React.MouseEvent) => {
    e.preventDefault();
    openBasket();
  };

  return (
    <header className={s.header}>
      {isMenuOpen && (
        <div
          className={`${s.menu_overlay} ${isMenuOpen ? s.open : ""}`}
          onClick={closeMenu}
        />
      )}
      <div className={s.stock}>
        <p className={s.stock_p}>
          Скидка 10% по промокоду “ZAMOK” на все заказы до 10.09
        </p>
        <a className={s.stock_a} href="#">
          Обратный звонок
        </a>
      </div>
      <div className={s.logo_container}>
        <div className={s.burger_menu} onClick={toggleMenu}>
          <span
            className={`${s.burger_line} ${isMenuOpen ? s.open : ""}`}
          ></span>
          <span
            className={`${s.burger_line} ${isMenuOpen ? s.open : ""}`}
          ></span>
          <span
            className={`${s.burger_line} ${isMenuOpen ? s.open : ""}`}
          ></span>
        </div>
        <div className={s.logo_img}>
          <Link to="/" className={s.nav_link} onClick={closeMenu}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav className={s.nav_menu}>
          <ul className={s.nav_list}>
            <li className={s.nav_item}>
              <Link to="/" className={s.nav_link}>
                Главная
              </Link>
            </li>
            <li className={s.nav_item}>
              <Link to="/catalog" className={s.nav_link}>
                Каталог
              </Link>
            </li>
            <li className={s.nav_item}>
              <Link to="/wholesale" className={s.nav_link}>
                Оптовая продажа
              </Link>
            </li>
            <li className={s.nav_item}>
              <Link to="/about" className={s.nav_link}>
                О нас
              </Link>
            </li>
          </ul>
        </nav>
        <div className={s.container_information}>
          <div className={s.information_number}>
            <LuPhone className={s.header_icon} size={18} strokeWidth={1.75} />
            <a href="tel:+79665588499">+7 (966) 55 88 499</a>
          </div>
          <div className={s.information_icon}>
            <Link
              to="/favorites"
              aria-label="Избранное"
              className={s.icon_link}
            >
              <LuHeart className={s.icon_heart} size={22} strokeWidth={1.75} />
            </Link>
            <button
              type="button"
              className={s.basket_button}
              onClick={handleOpenBasket}
              aria-label="Открыть корзину"
            >
              <LuShoppingBag className={s.icon_cart} size={22} strokeWidth={1.75} />
              {totalItems > 0 && (
                <span className={s.cart_count}>{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`${s.mobile_menu} ${isMenuOpen ? s.open : ""}`}>
        <ul className={s.mobile_nav_list}>
          <li className={s.mobile_nav_item}>
            <Link to="/" className={s.mobile_nav_link} onClick={closeMenu}>
              Главная
            </Link>
          </li>
          <li className={s.mobile_nav_item}>
            <Link
              to="/catalog"
              className={s.mobile_nav_link}
              onClick={closeMenu}
            >
              Каталог
            </Link>
          </li>
          <li className={s.mobile_nav_item}>
            <Link
              to="/wholesale"
              className={s.mobile_nav_link}
              onClick={closeMenu}
            >
              Оптовая продажа
            </Link>
          </li>
          <li className={s.mobile_nav_item}>
            <Link to="/about" className={s.mobile_nav_link} onClick={closeMenu}>
              О нас
            </Link>
          </li>
        </ul>
        <div className={s.mobile_contacts}>
          <div className={s.mobile_phone}>
            <LuPhone className={s.header_icon} size={18} strokeWidth={1.75} />
            <a href="tel:+79665588499" onClick={closeMenu}>
              +7 (966) 55 88 499
            </a>
          </div>
        </div>
      </div>
      <Basket
        isOpen={isBasketOpen}
        onClose={closeBasket}
        items={basketItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </header>
  );
};

export default Header;
