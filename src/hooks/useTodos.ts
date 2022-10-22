
import { useGetTodos } from "./useGetTodos";
import { useCreateTodo } from "./useCreateTodo";
import { useUpdateTodo } from "./useUpdateTodo";
export function useTodos() {
  const { isLoading, error, data: todos} = useGetTodos();

  const { mutateAsync: createTodo, isLoading: createTodoIsLoading } = useCreateTodo();
  const { mutateAsync: updateTodo } = useUpdateTodo();
  return {
    todos,
    isLoading,
    error,
    createTodo,
    updateTodo
  }
}