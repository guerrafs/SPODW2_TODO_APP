import { useState } from "react";

const AddTodo = ({ addTodo }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const input = event.target;
      const text = input.value.trim();
      if (text) {
        addTodo(text);
        input.value = "";
      }
    }
  };

  return (
    <input
      type="text"
      placeholder="Adicione aqui sua nova tarefa"
      onKeyDown={handleKeyPress}
    />
  );
};

const TodoFilter = ({ setFilter }) => {
  const handleFilterChange = (filter) => (event) => {
    event.preventDefault();
    setFilter(filter);
  };

  return (
    <div className="center-content">
      <a onClick={handleFilterChange("all")} href="#" id="filter-all">
        Todos os itens
      </a>
      <a onClick={handleFilterChange("done")} href="#" id="filter-done">
        Concluídos
      </a>
      <a onClick={handleFilterChange("pending")} href="#" id="filter-pending">
        Pendentes
      </a>
    </div>
  );
};

const TodoItem = ({ todo, markTodoAsDone }) => {
  const handleClick = () => {
    markTodoAsDone(todo.id);
  };

  return (
    <>
      {todo.done ? (
        <li style={{ textDecoration: "line-through" }}>{todo.text}</li>
      ) : (
        <li>
          {todo.text}
          <button onClick={handleClick}>Concluir</button>
        </li>
      )}
    </>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: crypto.randomUUID(), text: "Learn React", done: false },
    { id: crypto.randomUUID(), text: "Learn JS", done: true },
  ]);
  const [filter, setFilter] = useState("all");
  const shouldRender = filter === "pending" ? false : true;
  const viewAll = filter === "all";

  const addTodo = (text) => {
    const newTodo = { id: crypto.randomUUID(), text, done: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const markTodoAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: true } : todo
      )
    );
  };

  return (
    <>
      <h1>Todo List</h1>
      <div className="center-content">
        Versão inicial da aplicação de lista de tarefas para a disciplina SPODWE2
      </div>
      <TodoFilter setFilter={setFilter} />
      <AddTodo addTodo={addTodo} />
      <ul id="todo-list">
        {viewAll
          ? todos.map((todo, index) => (
              <TodoItem key={index} todo={todo} markTodoAsDone={markTodoAsDone} />
            ))
          : todos
              .filter((n) => n.done === shouldRender)
              .map((todo, index) => (
                <TodoItem key={index} todo={todo} markTodoAsDone={markTodoAsDone} />
              ))}
      </ul>
    </>
  );
};

export { TodoList };
