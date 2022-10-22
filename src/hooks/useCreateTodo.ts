import { useMutation } from '@tanstack/react-query';
import { HEADERS, SERVER_URL } from "../constants";
import { queryClient } from "..";

export function useCreateTodo() {
  return useMutation(({ label, done, pos }: { label: string, done: boolean, pos: number }) => fetch(SERVER_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ label, done, pos }),
  }).then((res) => res.json()), { onSuccess: () => queryClient.invalidateQueries(['todoData']),
})}

// create todo hook using mutations in React query