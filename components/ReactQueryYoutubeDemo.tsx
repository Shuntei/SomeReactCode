import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const todos = [
  { id: 1, title: "Learn HTML" },
  { id: 2, title: "Learn CSS" },
  { id: 3, title: "Learn JS" },
];

type Todo = {
  id: number;
  title: string;
};

export const fetchTodos = async (query = ""): Promise<Todo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("fetched todos");

  const filterTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(query.toLowerCase())
  );

  return [...filterTodos];
};

export const addTodo = async (todo: Pick<Todo, "title">): Promise<Todo> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newTodo = {
    id: todos.length + 1,
    title: todo.title,
    completed: false,
  };

  todos.push(newTodo);

  return newTodo;
};

function ReactQueryYoutubeDemo() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");

  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(search),
    queryKey: ["todos", { search }],
    // staleTime: Infinity,
    staleTime: 10000,
    // cacheTime: 10000, //v4新版不需要了,直接寫在staleTime即可
  });

  const { mutate, mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <button
        onClick={async () => {
          try {
            await addTodoMutation({ title });
            setTitle("");
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Add Todo
      </button>
      {todos?.map((todo) => {
        // return <TodoCards key={todo.id} todo={todo} />
        return (
          <p key={todo.id}>
            {todo.id}~~~{todo.title}
          </p>
        );
      })}
    </div>
  );
}

export default ReactQueryYoutubeDemo;
