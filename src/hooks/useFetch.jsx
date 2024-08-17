import { useState, useEffect } from 'react';

import axios from 'axios';

export function useFetch({ url, params }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsString = JSON.stringify(params);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const response = await axios(url, { params: JSON.parse(paramsString) });

        // if (!response.ok) {
        //   throw new Error(`HTTP error: Status ${response.status}`);
        // }

        !ignore && setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url, paramsString]);

  return { data, isLoading, error };
}
