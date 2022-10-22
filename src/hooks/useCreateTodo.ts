import { ToDo } from "../ApiClient";
import { useMutation } from '@tanstack/react-query';
import { HEADERS, SERVER_URL } from "../constants";
import { queryClient } from "..";

export function useCreateTodo() {
  return useMutation((newTodo: ToDo) => fetch(SERVER_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ label: newTodo.label }),
  }).then((res) => res.json()), { onSuccess: () => queryClient.invalidateQueries(['todoData']),
})}