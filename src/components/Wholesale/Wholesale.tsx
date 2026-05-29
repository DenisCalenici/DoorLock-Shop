import Layout from "../Layout/Layout";
import s from "./Wholesale.module.css";

const Wholesale = () => {
  return (
    <Layout title="Оптовые продажи">
      <article className={s.wholesale}>
        <h1>Оптовые продажи</h1>
        <p>
          Предлагаем специальные условия для дилеров, застройщиков и
          системных интеграторов.
        </p>
        <div className={s.wholesale_grid}>
          <section>
            <h2>Условия</h2>
            <ul>
              <li>Скидки от объёма заказа</li>
              <li>Отсрочка платежа для постоянных клиентов</li>
              <li>Персональный менеджер</li>
            </ul>
          </section>
          <section>
            <h2>Как начать</h2>
            <p>
              Оставьте заявку через форму обратного звонка или позвоните по
              телефону{" "}
              <a href="tel:+79665588499">+7 (966) 558-84-99</a>.
            </p>
          </section>
        </div>
      </article>
    </Layout>
  );
};

export default Wholesale;
