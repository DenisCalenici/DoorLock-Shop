import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../utils/getErrorMessage";

interface UseAsyncDataOptions {
  enabled?: boolean;
}

export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList,
  options?: UseAsyncDataOptions,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const enabled = options?.enabled ?? true;

  const reload = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setData(await fetcher());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, isLoading, error, reload, setData };
}
