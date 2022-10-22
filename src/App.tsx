
import { useEffect, useState } from 'react';
import { ApiClient, ToDo } from './ApiClient';
import { useTodos } from './hooks/useTodos';
import './App.css';

const apiClient = new ApiClient();

function App() {
  const { todos, isLoading, createTodo, updateTodo } = useTodos();
  const [label, setLabel] = useState('');

  console.log(todos)


  // useEffect(() => {
    
  // }, [createTodoIsLoading])


  if (isLoading) return <>Loading...</>

  const handleCreateTodo = (label: string) => {
    // const todo: ToDo = { label, done: false };
    createTodo({ label, done: false })
  }

  return (
    <>
      <h1>To Do List</h1>

      <div className="add-todo-container">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Buy groceries"
        />
        <button onClick={() => handleCreateTodo(label)}>Add ToDo</button>
      </div>

      {todos.map((todo: ToDo) => (
        <div key={todo.id} className="todo-item">
          <label
            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          >
            {todo.label}
          </label>
          <button onClick={() => updateTodo(todo?.id || '')}>
            Mark {todo.done ? 'Undone' : 'Done'}
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
