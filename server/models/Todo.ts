import { Label } from "common/label";
import { Todo } from '../../types';
import { Request } from "express";

export class TodoModel implements Todo {
  label: Label;
  done: boolean;

  static async of(req: Request) {
    const body = req.body;
    return new TodoModel(Label.of(body.label));
}

  constructor(label: Label) {
    this.label = label;
    this.done = false;
  }
}

