import s from "./AsyncState.module.css";

interface LoadingStateProps {
  message?: string;
  fullHeight?: boolean;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Загрузка...",
  fullHeight = false,
  className,
}) => (
  <div
    className={`${s.container} ${fullHeight ? s.container_full : ""} ${className ?? ""}`}
    role="status"
    aria-live="polite"
  >
    <div className={s.spinner} aria-hidden="true" />
    <p className={s.loading_text}>{message}</p>
  </div>
);

export default LoadingState;
