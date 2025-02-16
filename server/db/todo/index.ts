import { DatabaseNames } from "db/dbs";
import { TodoModel } from "models/todo";
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

    async getAll(): Promise<TodoModel[]> {
      try {
        const res = await this.client.query(`SELECT * FROM todo`);
        console.log(res);
        const { rows } = res;
        return rows as TodoModel[];
      } catch (err) {
        console.log(err)
      }

    }

    async create(todo: TodoModel): Promise<TodoModel> {
      const { rows } = await this.client.query(
        `INSERT INTO ${DatabaseNames.Todo} (label) VALUES ($1) RETURNING *`, [todo.label]
        );
      
      return rows[0];

    }

    async update(id: number, pos: number, done: boolean): Promise<any> {
        await this.client.query(
          `UPDATE ${DatabaseNames.Todo} SET pos = $1, done = $1 WHERE id = $1 RETURNING *`,
          [pos, done, id]
        )
    }

    async delete(): Promise<{}> {
      await this.client.query(
        `DELETE FROM ${DatabaseNames.Todo}`
      )
      return {};
    }
}