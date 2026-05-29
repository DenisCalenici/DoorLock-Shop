import type { ReactNode } from "react";
import LoadingState from "./LoadingState";
import ErrorState, { type RetryAction } from "./ErrorState";
import EmptyState from "./EmptyState";

interface EmptyConfig {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface AsyncStateGateProps {
  isLoading: boolean;
  error: string | null;
  loadingMessage: string;
  fullHeight?: boolean;
  retryAction?: RetryAction;
  onRetry?: () => void;
  isEmpty?: boolean;
  empty?: EmptyConfig;
  wrap?: (content: ReactNode) => ReactNode;
  children: ReactNode;
}

const AsyncStateGate = ({
  isLoading,
  error,
  loadingMessage,
  fullHeight,
  retryAction,
  onRetry,
  isEmpty,
  empty,
  wrap = (content) => content,
  children,
}: AsyncStateGateProps) => {
  if (isLoading) {
    return wrap(<LoadingState message={loadingMessage} fullHeight={fullHeight} />);
  }

  if (error) {
    return wrap(
      <ErrorState
        message={error}
        retryAction={retryAction}
        onRetry={onRetry}
        fullHeight={fullHeight}
      />,
    );
  }

  if (isEmpty && empty) {
    return wrap(
      <EmptyState
        title={empty.title}
        message={empty.message}
        actionLabel={empty.actionLabel}
        onAction={empty.onAction}
        fullHeight={fullHeight}
      />,
    );
  }

  return <>{children}</>;
};

export default AsyncStateGate;
