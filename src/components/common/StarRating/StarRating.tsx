import { LuStar } from "react-icons/lu";
import s from "./StarRating.module.css";

interface StarRatingProps {
  rate?: number;
  max?: number;
  size?: number;
}

const StarRating = ({ rate = 0, max = 5, size = 16 }: StarRatingProps) => {
  const filledCount = Math.min(max, Math.max(0, Math.round(rate)));

  return (
    <span
      className={s.stars}
      aria-label={`Рейтинг ${rate} из ${max}`}
      role="img"
    >
      {Array.from({ length: max }, (_, index) => (
        <LuStar
          key={index}
          size={size}
          strokeWidth={1.75}
          className={index < filledCount ? s.star_filled : s.star_empty}
        />
      ))}
    </span>
  );
};

export default StarRating;
