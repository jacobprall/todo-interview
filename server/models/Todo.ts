import { Todo } from '../../types';
import { Request } from "express";

export class TodoModel implements Todo {
  label: string;
  done: boolean;
  id?: number;
  pos: number;

  static async of(req: Request) {
    const body = req.body;
    return new TodoModel(body.label, body.pos);
}

  constructor(label: string, pos: number) {
    this.label = label;
    this.done = false;
    this.pos = pos;
  }
}

// model to handle Todo logic
