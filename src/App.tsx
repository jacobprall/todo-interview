
import { useEffect, useState } from 'react';
import { ToDo } from './interfaces';
import { useTodos } from './hooks/useTodos';
import { arrayMove } from 'react-movable';
import { Button, Heading, Input, Box, Tooltip, VStack } from '@chakra-ui/react';
import './App.css';

function App() {
  const { todos, isLoading, createTodo, updateTodo, deleteTodos, refetch } = useTodos();
  const [label, setLabel] = useState('');
  const [from, setFrom] = useState<number | undefined>(undefined);
  const [to, setTo] = useState<number | undefined>(undefined);


  const handleCreateTodo = (label: string, pos: number) => {
    createTodo({ label, done: false, pos })
  }

  const handleReorder = () => {
    if (typeof from === 'undefined' || typeof to === 'undefined') {
      return;
    }
    const newOrder: ToDo[] = arrayMove(todos, from, to).map(
      (ele: ToDo, i: number) => {
        ele.pos = i;
        return ele;
      }
    );
    newOrder.forEach((todo) => updateTodo(todo))
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
    <Box padding="64px" border="1px solid lightgray" borderRadius="5px" display="flex" flexDirection={"column"}>
      <Heading mb="32px" mt="0px" as="h1">To Do List</Heading>

      <div className="add-todo-container">
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Buy groceries"
        />

      
        <Button px="32px" background="#FED7D7" onClick={deleteTodos}>
          <Tooltip label="This action permanently deletes all todos">
          Clear Todos
          </Tooltip>
        </Button>

      <Button px="32px" background="#C6F6D5" onClick={() => handleCreateTodo(label, todos.length)}>Add Todo</Button>
      </div>
      <VStack w="100%">
      {todos.sort((a: ToDo, b: ToDo) => a.pos - b.pos).map((todo: ToDo, i: number) => (
          <Box w="100%" display="flex" justifyContent={"space-between"} p="32px" key={todo.id} border="0.5px solid lightgray" boxShadow={from === i ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px;' : ''}>
          <Button p="8px" cursor="pointer" onClick={() => handleNumClick(i)}>
            { typeof from === 'undefined' ? 'Move' : 'Swap' }
          </Button>
          <label
            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
          >
            {todo.label}
          </label>
          <Button onClick={() => updateTodo({ ...todo, done: !todo.done })}>
            Mark {todo.done ? 'Undone' : 'Done'}
          </Button>

        </Box>


      ))}
      </VStack>
    </Box>
  );
}

export default App;
