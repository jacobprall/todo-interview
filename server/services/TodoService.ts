import { TodoDatabaseClient } from "db/todo";
import { TodoModel } from "models/Todo";

export interface ApplicationService {};

export class TodoService implements ApplicationService {
  private readonly todoDatabase: TodoDatabaseClient;

  public constructor(todoDatabase: TodoDatabaseClient) {
    this.todoDatabase = todoDatabase
  }

  public async create(todo: TodoModel) {
    return this.todoDatabase.create(todo);
  }

  public async getAll() {
    return await this.todoDatabase.getAll();
  }

  public async update(id: number){
    return await this.todoDatabase.update(id)
  }

  public static getType() {
    return "TodoService"
  }
}