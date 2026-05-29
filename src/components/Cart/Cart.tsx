import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import s from "../Basket/Basket.module.css";

const Cart = () => {
  const {
    basketItems,
    getTotalPrice,
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <Layout title="Корзина">
      <div className={s.basket_page}>
        <h1>Корзина</h1>

        {basketItems.length === 0 ? (
          <p className={s.empty_basket}>Ваша корзина пуста</p>
        ) : (
          <>
            <div className={s.basket_items}>
              {basketItems.map((item) => (
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
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                    />
                    <button onClick={() => removeFromCart(item.id)}>
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={s.basket_footer}>
              <div className={s.total}>
                Итого: {formatPrice(getTotalPrice())}
              </div>
              <Link to="/checkout" className={s.checkout_btn}>
                Оформить заказ
              </Link>
              <Link to="/catalog" className={s.checkout_btn}>
                Продолжить покупки
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
