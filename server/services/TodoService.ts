import { TodoPgDatabase } from "db/TodoPgDatabase";
import { TodoModel } from "models/Todo";

export interface ApplicationService {};

export class TodoService implements ApplicationService {
  private readonly todoDatabase: TodoPgDatabase;

  public constructor(todoDatabase: TodoPgDatabase) {
    this.todoDatabase = todoDatabase
  }

  public async create(todo: TodoModel) {
    return this.todoDatabase.create(todo);
  }

  public async getAll() {
    return this.todoDatabase.getAll();
  }

  public static getType() {
    return "TodoService"
  }
}