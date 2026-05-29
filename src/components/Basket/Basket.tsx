import React from "react";
import { Link } from "react-router-dom";
import { BasketItem } from "../../types/Basket.type";
import { formatPrice } from "../../utils/formatPrice";
import s from "./Basket.module.css";

interface BasketProps {
  isOpen: boolean;
  onClose: () => void;
  items: BasketItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const Basket: React.FC<BasketProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className={s.basket_overlay} onClick={onClose}>
      <div className={s.basket_modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.basket_header}>
          <h2>Корзина</h2>
          <button className={s.close_btn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={s.basket_items}>
          {items.length === 0 ? (
            <p className={s.empty_basket}>Корзина пуста</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className={s.basket_item}>
                <div className={s.item_info}>
                  {item.image && <img src={item.image} alt={item.name} />}
                  <div>
                    <h4>{item.name}</h4>
                    <p>{formatPrice(item.price)}</p>
                  </div>
                </div>

                <div className={s.item_controls}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                  />
                  <button onClick={() => onRemoveItem(item.id)}>
                    Удалить
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={s.basket_footer}>
          <div className={s.total}>Итого: {formatPrice(totalPrice)}</div>
          <Link
            to="/checkout"
            className={s.checkout_btn}
            onClick={onClose}
          >
            Оформить заказ
          </Link>
          <Link
            to="/cart"
            className={s.checkout_btn}
            onClick={onClose}
          >
            Перейти в корзину
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Basket;


