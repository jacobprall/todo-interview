
import { useGetTodos } from "./useGetTodos";
import { useCreateTodo } from "./useCreateTodo";
import { useUpdateTodo } from "./useUpdateTodo";
export function useTodos() {
  const { isLoading, error, data, refetch } = useGetTodos();

  const { mutateAsync: createTodo } = useCreateTodo();
  const { mutateAsync: updateTodo } = useUpdateTodo();
  return {
    todos: data?.data,
    isLoading,
    error,
    createTodo,
    updateTodo,
    refetch,
  }
}