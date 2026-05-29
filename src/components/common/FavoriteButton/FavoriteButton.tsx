import { LuHeart } from "react-icons/lu";
import { useFavorites } from "../../../context/FavoritesContext";
import iconStyles from "../icons/ActionIcons.module.css";

interface FavoriteButtonProps {
  productId: number;
  className?: string;
  size?: number;
  showLabel?: boolean;
}

const FavoriteButton = ({
  productId,
  className = "",
  size = 16,
  showLabel = false,
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(productId);

  return (
    <button
      type="button"
      className={`${className} ${iconStyles.favorite_button} ${
        active ? iconStyles.favorite_active : ""
      }`}
      aria-label={active ? "Убрать из избранного" : "В избранное"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(productId);
      }}
    >
      <LuHeart
        size={size}
        strokeWidth={1.75}
        className={iconStyles.favorite_icon}
      />
      {showLabel && (
        <span className={iconStyles.favorite_label}>В избранное</span>
      )}
    </button>
  );
};

export default FavoriteButton;
