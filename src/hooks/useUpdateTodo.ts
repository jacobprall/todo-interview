import { useMutation } from '@tanstack/react-query';
import { HEADERS, SERVER_URL } from "../constants";
import { queryClient } from "..";

export function useUpdateTodo() {
  return useMutation(({ id, pos, done }: { id: number, pos: number, done: boolean }) => 
  fetch(`${SERVER_URL}/${id}`, { method: 'PUT', headers: HEADERS, body: JSON.stringify({ pos, done }) })
  .then((res) => res.json()), { onSuccess: () => queryClient.invalidateQueries(['todoData']), onMutate: (...args) => console.log(args) })
}

  // update Todo implementation