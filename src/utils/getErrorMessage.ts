const DEFAULT_ERROR = "Ошибка при загрузке данных";

export const getErrorMessage = (err: unknown): string =>
  err instanceof Error ? err.message : DEFAULT_ERROR;
