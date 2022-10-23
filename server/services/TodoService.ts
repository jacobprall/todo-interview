import { TodoDatabaseClient } from "../db/todo";
import { TodoModel } from "../models/Todo";

export interface ApplicationService {};

export class TodoService implements ApplicationService {
  private readonly todoDatabase: TodoDatabaseClient;

  public constructor(todoDatabase: TodoDatabaseClient) {
    this.todoDatabase = todoDatabase
  }

  public async create(todo: TodoModel) {
    console.log({ todo })
    const { rows } = await this.todoDatabase.create(todo);
    return rows[0];
  }

  public async getAll(): Promise<TodoModel[]> {
    const result = await this.todoDatabase.getAll();
    return result.rows;
  }

  public async update(id: number, pos: number, done: boolean){
    const { rows } = await this.todoDatabase.update(id, pos, done)
    return rows[0];
  }

  public async delete() {
    return await this.todoDatabase.delete();
  }

  public static getType() {
    return "TodoService"
  }
}

// Service logic, nice and clean middle man between controller and database. Plenty of room for expansion