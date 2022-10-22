import { Label } from "common/label";
import { Todo } from '../../types';
import { Request } from "express";

export class TodoModel implements Todo {
  label: string;
  done: boolean;
  id?: number;

  static async of(req: Request) {
    const body = req.body;
    return new TodoModel(body.label);
}

  constructor(label: string) {
    this.label = label;
    this.done = false;
  }
}

