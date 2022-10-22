import { Client } from "pg";
import { Todo, TodoDatabase }from '../../types'

export class TodoPgDatabase implements TodoDatabase {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  } 

  async getAll() {
    const queryResult = await this.client.query('SELECT * FROM todo');
    return queryResult.rows;
  }

  async create(todo: Todo) {
    const mutationResult = await this.client.query(
      'INSERT INTO todo (label) VALUES ($1) RETURNING *',
      [todo.label]
      );
      return mutationResult.rows[0]
  }
}