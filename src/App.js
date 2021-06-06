import { lazy, Suspense, useEffect, useState } from 'react';
import { fetchTodos } from './api';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { TodoList } from './components/Todo/TodoList';
import { Context } from './store/context';

const AddTodo = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('./components/Todo/AddTodo'));
      }, 3000);
    })
);

export function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchTodos(5).then((todos) => setTodos(todos));

    setLoading(false);
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal />

        <Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}
