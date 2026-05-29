import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import s from "./Categories.module.css";
import {
  fetchCategories,
  mapCategoriesToItems,
  type CategoryItem,
} from "../../api/products";
import { useAsyncData } from "../../hooks/useAsyncData";
import { AsyncStateGate } from "../common/asyncState";

const Categories: React.FC = () => {
  const loadCategories = useCallback(async () => {
    const data = await fetchCategories();
    return mapCategoriesToItems(data);
  }, []);

  const { data: categories, isLoading, error, reload } =
    useAsyncData<CategoryItem[]>(loadCategories, []);

  const categoryList = categories ?? [];

  const wrapSection = (content: React.ReactNode) => (
    <section className={s.categories}>
      <div className={s.categories_container}>{content}</div>
    </section>
  );

  return (
    <AsyncStateGate
      isLoading={isLoading}
      error={error}
      loadingMessage="Загрузка категорий..."
      onRetry={reload}
      wrap={wrapSection}
    >
      <>
        <h1 className={s.categories_title}>Категории</h1>

        <div className={s.categories_grid}>
          {categoryList.map((category) => (
            <div key={category.id} className={s.category_card}>
              <div className={s.category_header}>
                <h3 className={s.category_title}>{category.title}</h3>
                <Link to={category.link} className={s.category_button}>
                  Перейти
                  <span className={s.category_button_arrow}>→</span>
                </Link>
              </div>

              <div className={s.category_image_container}>
                <img
                  src={category.image}
                  alt={category.title}
                  className={s.category_image}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    </AsyncStateGate>
  );
};

export default Categories;
