import s from "./CheckoutForm.module.css";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../context/CartContext";
import { AsyncStateGate } from "../common/asyncState";
import { formatPrice } from "../../utils/formatPrice";

interface CheckoutFormState {
  surname: string;
  name: string;
  email: string;
  phone: string;
  delivery: string;
  payment: string;
}

const initialForm: CheckoutFormState = {
  surname: "",
  name: "",
  email: "",
  phone: "",
  delivery: "courier",
  payment: "card",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CheckoutForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(id);
  const { basketItems, getTotalPrice, cartItems, removeFromCart } = useCart();
  const [formState, setFormState] = useState<CheckoutFormState>(initialForm);
  const [formErrors, setFormErrors] = useState<Partial<CheckoutFormState>>({});
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const isSingleProductCheckout = !!id;
  const orderItems = isSingleProductCheckout
    ? product
      ? [{ id: product.id, name: product.title, price: product.price, quantity: 1 }]
      : []
    : basketItems;

  const orderTotal = useMemo(() => {
    if (isSingleProductCheckout && product) {
      return product.price;
    }
    return getTotalPrice();
  }, [isSingleProductCheckout, product, getTotalPrice]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const errors: Partial<CheckoutFormState> = {};

    if (!formState.surname.trim()) errors.surname = "Укажите фамилию";
    if (!formState.name.trim()) errors.name = "Укажите имя";
    if (!formState.email.trim() || !emailPattern.test(formState.email)) {
      errors.email = "Укажите корректный e-mail";
    }
    if (!formState.phone.trim() || formState.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Укажите корректный телефон";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitMessage(null);

    if (!validate()) return;

    if (orderItems.length === 0) {
      setSubmitMessage("Добавьте товары в корзину перед оформлением заказа.");
      return;
    }

    if (!isSingleProductCheckout) {
      cartItems.forEach((item) => removeFromCart(item.id));
    }

    setSubmitMessage("Заказ успешно оформлен! Менеджер свяжется с вами.");
    setFormState(initialForm);

    setTimeout(() => navigate("/"), 2500);
  };

  const gateLoading = isSingleProductCheckout ? isLoading : false;
  const gateError = isSingleProductCheckout ? error : null;

  return (
    <Layout title="Оформление заказа">
      <AsyncStateGate
        isLoading={gateLoading}
        error={gateError}
        loadingMessage="Загрузка оформления заказа..."
        fullHeight
        retryAction="back"
      >
        <div className={s.body_form_container}>
          <div className={s.name_form_body}>
            <h1 className={s.name_form_h1}>Оформление заказа</h1>

            <div className={s.order_summary}>
              <h2 className={s.name_form_2}>Ваш заказ</h2>
              {orderItems.length === 0 ? (
                <p>
                  Корзина пуста.{" "}
                  <Link to="/catalog">Перейти в каталог</Link>
                </p>
              ) : (
                <ul className={s.order_list}>
                  {orderItems.map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.quantity} —{" "}
                      {formatPrice(item.price * item.quantity)}
                    </li>
                  ))}
                  <li className={s.order_total}>
                    <strong>Итого: {formatPrice(orderTotal)}</strong>
                  </li>
                </ul>
              )}
            </div>

            {submitMessage && (
              <p className={s.submit_success} role="status">
                {submitMessage}
              </p>
            )}

            <div className={s.name_form_body_container}>
              <h2 className={s.name_form_2}>1. Контактные данные</h2>
              <form className={s.form_container} onSubmit={handleSubmit}>
                <div className={s.input_container}>
                  <h2 className={s.name_form}>Фамилия</h2>
                  <input
                    className={s.input_form}
                    type="text"
                    placeholder="Фамилия"
                    name="surname"
                    value={formState.surname}
                    onChange={handleChange}
                  />
                  {formErrors.surname && (
                    <span className={s.field_error}>{formErrors.surname}</span>
                  )}
                </div>
                <div className={s.input_container}>
                  <h2 className={s.name_form}>Имя</h2>
                  <input
                    className={s.input_form}
                    type="text"
                    placeholder="Имя"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  {formErrors.name && (
                    <span className={s.field_error}>{formErrors.name}</span>
                  )}
                </div>
                <div className={s.input_container}>
                  <h2 className={s.name_form}>Телефон</h2>
                  <input
                    className={s.input_form}
                    type="tel"
                    placeholder="+7 (___) ___ __ __"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                  />
                  {formErrors.phone && (
                    <span className={s.field_error}>{formErrors.phone}</span>
                  )}
                </div>
                <div className={s.input_container}>
                  <h2 className={s.name_form}>E-mail</h2>
                  <input
                    className={s.input_form}
                    type="email"
                    placeholder="example@mail.ru"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && (
                    <span className={s.field_error}>{formErrors.email}</span>
                  )}
                </div>
                <div className={s.input_container}>
                  <h2 className={s.name_form}>Доставка</h2>
                  <select
                    className={s.input_form}
                    name="delivery"
                    value={formState.delivery}
                    onChange={handleChange}
                  >
                    <option value="courier">Курьер</option>
                    <option value="pickup">Самовывоз</option>
                  </select>
                </div>
                <div className={s.input_container}>
                  <h2 className={s.name_form}>Оплата</h2>
                  <select
                    className={s.input_form}
                    name="payment"
                    value={formState.payment}
                    onChange={handleChange}
                  >
                    <option value="card">Картой онлайн</option>
                    <option value="cash">При получении</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className={s.submit_button}
                  disabled={orderItems.length === 0}
                >
                  Оформить заказ
                </button>
              </form>
            </div>
          </div>
        </div>
      </AsyncStateGate>
    </Layout>
  );
};

export default CheckoutForm;
