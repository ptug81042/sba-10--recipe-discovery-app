import { useState, useEffect } from "react";

/**
 * Custom hook to fetch data from a given URL.
 * @param url - The URL to fetch data from. If null, fetch is skipped.
 * @returns An object containing loading, error, and data states.
 */
function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      // Reset state if no URL is provided
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    let isCancelled = false; // To prevent state updates if component unmounts

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = (await response.json()) as T;

        if (!isCancelled) {
          setData(jsonData);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to mark as cancelled if the component unmounts
    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;