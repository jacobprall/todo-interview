
import { useEffect, useState } from 'react';
import { ToDo } from './interfaces';
import { useTodos } from './hooks/useTodos';
import { OrderGroup, OrderItem, defaultTheme } from 'react-draggable-order';
import { arrayMoveImmutable } from 'array-move';
import './App.css';

function App() {
  const { todos, isLoading, createTodo, updateTodo, refetch } = useTodos();
  const [label, setLabel] = useState('');

  const [editPos, setEditPos] = useState<boolean | null>(null);
  const [localOrder, setLocalOrder] = useState(todos);



  const handleCreateTodo = (label: string) => {
    createTodo({ label, done: false })
  }


   if (isLoading) return <>Loading...</>
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
      {todos.map((todo: ToDo, i: number) => (
          <div onMouseDown={() => setEditPos(true)} onMouseUp={() => setEditPos(false)} key={todo.id} className="todo-item">
        
      
          <label>
            {
              i
            }
          </label>
          <label
            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          >
            {todo.label}
          </label>
          <button onClick={() => updateTodo({ ...todo, done: !todo.done })}>
            Mark {todo.done ? 'Undone' : 'Done'}
          </button>

        </div>


      ))}
    </>
  );
}

export default App;
