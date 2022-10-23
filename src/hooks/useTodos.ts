
import { useGetTodos } from "./useGetTodos";
import { useCreateTodo } from "./useCreateTodo";
import { useUpdateTodo } from "./useUpdateTodo";
import { HEADERS, SERVER_URL } from "../constants";
import { ToDo } from "../interfaces";
export function useTodos() {
  const { isLoading, error, data, refetch } = useGetTodos();

  const { mutateAsync: createTodo } = useCreateTodo();
  const { mutateAsync: updateTodo } = useUpdateTodo();

  const deleteTodos = () => fetch(SERVER_URL, { method: 'DELETE', headers: HEADERS })
  return {
    todos: data?.data as ToDo[],
    isLoading,
    error,
    createTodo,
    updateTodo,
    refetch,
    deleteTodos,
  }
}

// unified interface for dealing with Todos