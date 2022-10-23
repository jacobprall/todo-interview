import { TodoController } from "../controllers/TodoController";
import express from "express";
const router = express.Router()

const todoController = new TodoController();

router.get('/todo', todoController.getAll);
router.post('/todo', todoController.create);
router.put('/todo/:id', todoController.update);
router.delete('/todo', todoController.delete);


export default router;

// This file contains all api routes