import { ToDo } from "../ApiClient";
import { useMutation } from '@tanstack/react-query';
import { HEADERS, SERVER_URL } from "../constants";
import { queryClient } from "..";

export function useUpdateTodo() {
  return useMutation((id: string) => fetch(`${SERVER_URL}/${id}`, { method: 'PUT', headers: HEADERS })
  .then((res) => res.json()), { onSuccess: () => queryClient.invalidateQueries(['todoData']) })
  }