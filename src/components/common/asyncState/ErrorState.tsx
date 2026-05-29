import s from "./AsyncState.module.css";

export type RetryAction = "reload" | "back";

interface ErrorStateProps {
  message: string;
  title?: string;
  retryAction?: RetryAction;
  retryLabel?: string;
  onRetry?: () => void;
  fullHeight?: boolean;
  className?: string;
}

const getDefaultRetryHandler = (action: RetryAction) => {
  if (action === "back") {
    return () => window.history.back();
  }
  return () => window.location.reload();
};

const getDefaultRetryLabel = (action: RetryAction) =>
  action === "back" ? "Вернуться назад" : "Попробовать снова";

const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  title = "Ошибка загрузки",
  retryAction = "reload",
  retryLabel,
  onRetry,
  fullHeight = false,
  className,
}) => {
  const handleRetry = onRetry ?? getDefaultRetryHandler(retryAction);
  const buttonLabel = retryLabel ?? getDefaultRetryLabel(retryAction);

  return (
    <div
      className={`${s.container} ${fullHeight ? s.container_full : ""} ${className ?? ""}`}
      role="alert"
    >
      <h2 className={s.title}>{title}</h2>
      <p className={s.message}>{message}</p>
      <button type="button" className={s.button} onClick={handleRetry}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default ErrorState;
