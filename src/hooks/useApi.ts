import { useState } from 'react';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useApi<T>() {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = async (url: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    setState({ ...state, loading: true, error: null });

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setState({ data, error: null, loading: false });
      return { data, error: null, loading: false };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState({ data: null, error: errorMessage, loading: false });
      return { data: null, error: errorMessage, loading: false };
    }
  };

  return {
    ...state,
    execute,
  };
} 