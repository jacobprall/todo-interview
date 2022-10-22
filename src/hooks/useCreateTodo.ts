import { useMutation } from '@tanstack/react-query';
import { HEADERS, SERVER_URL } from "../constants";
import { queryClient } from "..";

export function useCreateTodo() {
  return useMutation(({ label, done }: { label: string, done: boolean, }) => fetch(SERVER_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ label, done }),
  }).then((res) => res.json()), { onSuccess: () => queryClient.invalidateQueries(['todoData']),
})}