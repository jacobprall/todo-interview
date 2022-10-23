
import { useEffect, useState } from 'react';
import { ToDo } from './interfaces';
import { useTodos } from './hooks/useTodos';
import { List, arrayMove } from 'react-movable';
import './App.css';

function App() {
  const { todos, isLoading, createTodo, updateTodo, deleteTodos, refetch } = useTodos();
  const [label, setLabel] = useState('');
  const [from, setFrom] = useState<number | undefined>(undefined);
  const [to, setTo] = useState<number | undefined>(undefined);


  const handleCreateTodo = (label: string, pos: number) => {
    console.log(label, pos)
    createTodo({ label, done: false, pos })
  }

  const handleReorder = () => {
    if (typeof from === 'undefined' || typeof to === 'undefined') {
      return;
    }
    const newOrder: ToDo[] = arrayMove(todos, from, to);
    const updatedTodos: ToDo[] = todos.filter((todo: ToDo, i: number) => todo.id !== newOrder[i].id);
    updatedTodos.forEach((todo) => updateTodo(todo))
    refetch();
  }

  const handleNumClick = (i: number) => {
    if (typeof from === 'undefined') {
      setFrom(i);
      return;
    }
    if (typeof to === 'undefined') {
      setTo(i);
      return;
    }
  }

  useEffect(() => {
    if (typeof to !== 'undefined') {
      handleReorder();
      setFrom(undefined)
      setTo(undefined);
    }
  }, [to])


   if (isLoading) return <>Loading...</>
  return (
    <>
      <h1>To Do List</h1>
      <button onClick={deleteTodos}>Clear</button>
      <div className="add-todo-container">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Buy groceries"
        />
        <button onClick={() => handleCreateTodo(label, todos.length)}>Add ToDo</button>
      </div>
      {todos.sort((a: ToDo, b: ToDo) => a.pos - b.pos).map((todo: ToDo, i: number) => (
          <div key={todo.id} className="todo-item">
          <label onClick={() => handleNumClick(i)}>
            {
              i
            }
            Click to swap
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

// My attempt at re-ordering was not ideal for the user, where you'd click on one and then the other to basically move it there.
// I messed around with some draggable libraries, but I had spent a lot of time in the back end so I decided to wrap up unfinished.