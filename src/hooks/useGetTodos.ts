import { useQuery } from '@tanstack/react-query';
import { SERVER_URL, HEADERS } from '../constants';

export function useGetTodos() {
  const { isLoading, error, data, refetch } = useQuery(
    ['todoData'], () => fetch(SERVER_URL, { headers: HEADERS }).then(res => res.json())
  );

  return {
    isLoading,
    error,
    data,
    refetch,
  }
}

// basic getTodos hook using useQuery from React query