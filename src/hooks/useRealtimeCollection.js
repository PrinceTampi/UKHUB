import { useEffect, useState } from 'react';

/**
 * Shared hook to fetch and subscribe to a collection stored in localStorage.
 * Expects a fetch function (promise returning array) and an optional subscribe function.
 */
const useRealtimeCollection = (fetchFn, subscribeFn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        const snapshot = await fetchFn();
        if (active) {
          setData(snapshot);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Gagal memuat data');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    const unsubscribe =
      typeof subscribeFn === 'function'
        ? subscribeFn((snapshot) => {
            if (active) {
              setData(snapshot);
              setError(null);
            }
          })
        : () => {};

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [fetchFn, subscribeFn]);

  return { data, loading, error };
};

export default useRealtimeCollection;

