export const fetchTodos = async (todosLimit) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=${todosLimit}`
  );

  return await response.json();
};
