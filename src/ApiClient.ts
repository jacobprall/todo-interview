



// Api for interacting with the server
import { HEADERS, SERVER_URL } from './constants';

export interface ToDo {
  id?: string;
  label: string;
  done: boolean;
}




export class ApiClient {
  /**
   * Gets the list of all todos from the (localstorage) database
   */
  // async getToDos(): Promise<ToDo[]> {
  //   const response = await fetch(SERVER_URL, { headers: HEADERS });
  //   return await response.json();
  // }

  /**
   * Appends a new todo to the end of the database
   * @param label The label for the new todo to create
   */
  // async addTodo(label: string): Promise<ToDo> {
  //   const response = await fetch(SERVER_URL, {
  //     method: 'POST',
  //     headers: HEADERS,
  //     body: JSON.stringify({ label }),
  //   });
  //   return await response.json();
  // }

  /**
   * Toggles the 'done' state of a todo
   * @param id The ID of the todo to toggle
   */
  async toggleDone(id: string): Promise<ToDo> {
    const response = await fetch(`${SERVER_URL}/${id}`, { method: 'PUT', headers: HEADERS });
    return await response.json();
  }
}
