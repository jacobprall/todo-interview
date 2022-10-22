import { TodoModel } from "models/Todo";
import { TodoService } from "services/TodoService";
import { Request, Response } from "express";
import { ResponseBuilder } from "services/ApiService";
import service from "service";

export class TodoController {
  public create = async (req: Request, res: Response): Promise<any> => {
    const todo: TodoModel = await TodoModel.of(req);
    const result: TodoModel = await this.getService().create(todo);
    res.status(201).send(new ResponseBuilder(result).setMessage('Todo created'))
  }

  public getAll = async (req: Request, res: Response): Promise<any> => {
    const todos = await this.getService().getAll();
    res.status(200).send(new ResponseBuilder(todos).setMessage('Todos fetched'))
  }

  private getService(): TodoService {
    return service.appServices.get(TodoService.getType()) as TodoService
  }
}