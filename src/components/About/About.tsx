import Layout from "../Layout/Layout";
import s from "./About.module.css";

const About = () => {
  return (
    <Layout title="О нас">
      <article className={s.about}>
        <h1>О компании</h1>
        <p>
          Мы специализируемся на продаже и установке электронных замков для дома
          и бизнеса. Работаем с проверенными брендами и предоставляем гарантию на
          всю продукцию.
        </p>
        <ul className={s.about_list}>
          <li>Консультация и подбор замка под вашу дверь</li>
          <li>Доставка по городу и области</li>
          <li>Профессиональный монтаж и сервисное обслуживание</li>
          <li>Оптовые условия для партнёров</li>
        </ul>
        <p className={s.about_contact}>
          Телефон: <a href="tel:+79665588499">+7 (966) 558-84-99</a>
        </p>
      </article>
    </Layout>
  );
};

export default About;
