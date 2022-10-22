import { TodoController } from "controllers/TodoController";
import express from "express";
const router = express.Router()

const todoController = new TodoController();

// Route to get all todos
router.get('/todo', todoController.getAll);
router.post('/todo', todoController.create);
router.put('/todo/:id', todoController.update);

export default router;

// Route to toggle the 'done' state of a todo
// router.put('/todo/:id', async (req: Request, res: Response) => {
//   const result = await client.query(
//     'UPDATE todo SET done = NOT done WHERE id = $1 RETURNING *',
//     [req.params.id]
//   );
//   res.send(result.rows[0]);
// });

// router.listen(8080, async () => {
//   await client.connect();
//   console.log('Server is running at https://localhost:8080');
// });
