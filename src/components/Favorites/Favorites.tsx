import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import ProductList from "../catalog/product/ProductList";
import { useFavorites } from "../../context/FavoritesContext";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import { AsyncStateGate } from "../common/asyncState";
import s from "../catalog/Catalog.module.css";

const Favorites = () => {
  const { favoriteIds } = useFavorites();
  const { products, isLoading, error } = useProducts();
  const { addToCart, openBasket } = useCart();

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  const addToBasket = (product: (typeof products)[0]) => {
    addToCart(product);
    openBasket();
  };

  return (
    <Layout title="Избранное">
      <AsyncStateGate
        isLoading={isLoading}
        error={error}
        loadingMessage="Загрузка избранного..."
      >
        <section className={s.catalog_container}>
          <h1>Избранное</h1>
          {favoriteProducts.length === 0 ? (
            <div>
              <p>Список избранного пуст. Нажмите на сердечко у товара в каталоге.</p>
              <Link to="/catalog">Перейти в каталог</Link>
            </div>
          ) : (
            <div className={s.products_grid}>
              <ProductList
                products={favoriteProducts}
                addToBasket={addToBasket}
              />
            </div>
          )}
        </section>
      </AsyncStateGate>
    </Layout>
  );
};

export default Favorites;
