import s from "./AsyncState.module.css";

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  fullHeight?: boolean;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionLabel,
  onAction,
  fullHeight = false,
  className,
}) => (
  <div
    className={`${s.container} ${fullHeight ? s.container_full : ""} ${className ?? ""}`}
  >
    <h2 className={s.title}>{title}</h2>
    {message && <p className={s.message}>{message}</p>}
    {actionLabel && onAction && (
      <button type="button" className={s.button} onClick={onAction}>
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
