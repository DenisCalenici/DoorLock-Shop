export const FETCH_ERROR_PREFIX = "Ошибка при загрузке данных";

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${FETCH_ERROR_PREFIX}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
