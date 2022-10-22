import { Todo } from "./Todo";

export interface TodoDatabase {
  create(todo: Todo): Promise<Todo>;
  getAll(): Promise<Todo[]>
}