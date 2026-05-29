import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useLocation } from "react-router-dom";
import s from "./Layout.module.css";
import RequestCall from "../common/requestCall/RequestCall";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const PAGE_TITLES: Record<string, string> = {
  "/catalog": "Каталог",
  "/cart": "Корзина",
  "/favorites": "Избранное",
  "/about": "О нас",
  "/wholesale": "Оптовые продажи",
  "/checkout": "Оформление заказа",
};

const buildBreadcrumbs = (pathname: string, title?: string): BreadcrumbItem[] => {
  const crumbs: BreadcrumbItem[] = [{ label: "Главная", to: "/" }];
  const isHome = pathname === "/";

  if (isHome) {
    crumbs[0] = { label: "Главная" };
    return crumbs;
  }

  const isCatalog = pathname === "/catalog";
  const isProduct = pathname.startsWith("/product/");
  const isCheckoutProduct = pathname.startsWith("/checkout/") && pathname !== "/checkout";

  if (isCatalog || isProduct || isCheckoutProduct) {
    crumbs.push({
      label: "Каталог",
      to: isCatalog ? undefined : "/catalog",
    });
  }

  const autoTitle = PAGE_TITLES[pathname];
  const currentTitle =
    title && title !== "Магазин" ? title : autoTitle;

  if (currentTitle && !isCatalog) {
    crumbs.push({ label: currentTitle });
  } else if (isCatalog) {
    crumbs[crumbs.length - 1] = { label: "Каталог" };
  }

  return crumbs;
};

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const { pathname } = useLocation();
  const breadcrumbs = buildBreadcrumbs(pathname, title);

  return (
    <div className="layout">
      <Header />
      <nav className={s.nav_link} aria-label="Хлебные крошки">
        <ul className={s.breadcrumb_list}>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={`${crumb.label}-${index}`}>
              {index > 0 && (
                <li className={s.breadcrumb_sep} aria-hidden="true">
                  /
                </li>
              )}
              <li className={s.li_layout}>
                {crumb.to ? (
                  <Link className={s.link_layout} to={crumb.to}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={s.breadcrumb_current} aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>

      <main className="main-content">{children}</main>

      <RequestCall />
      <Footer />
    </div>
  );
};

export default Layout;
