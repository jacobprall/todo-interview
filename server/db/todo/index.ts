import { DatabaseNames } from "../dbs";
import { TodoModel } from "../../models/todo";
import pg from "pg";

export interface TodoDatabase {
  readonly client: pg.Client;
  getAll(): Promise<TodoModel[]>;
  create(todo: TodoModel): Promise<TodoModel>;
  update(id: number, pos: number, done: boolean): Promise<TodoModel>;
  delete(todo: TodoModel): Promise<{}>;
}

export class TodoDatabaseClient implements TodoDatabase {
    readonly client: pg.Client;
    constructor(client: pg.Client) {
      this.client = client;
    }

    async getAll(): Promise<any> {
      return await this.client.query(`SELECT * FROM todo`);
    }

    async create(todo: TodoModel): Promise<any> {
      return await this.client.query(
        `INSERT INTO ${DatabaseNames.Todo} (label) VALUES ($1) RETURNING *`, [todo.label]
        );
    }

    async update(id: number, pos: number, done: boolean): Promise<any> {
        return await this.client.query(
          `UPDATE ${DatabaseNames.Todo} SET pos = $1, done = $1 WHERE id = $1 RETURNING *`,
          [pos, done, id]
        )
    }

    async delete(): Promise<{}> {
      return await this.client.query(
        `DELETE FROM ${DatabaseNames.Todo}`
      )
    }
}

// Database logic, separated from service logic