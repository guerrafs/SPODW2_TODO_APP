import { useState } from "react";

const AddTodo = () => {
  return (
    <input
      type="text"
      id="new-todo"
      placeholder="Adicione aqui sua nova tarefa"
    />
  );
};

const TodoFilter = () => {
  return (
    <div className="center-content">
      <a href="#" id="filter-all">
        Todos os itens
      </a>
      <a href="#" id="filter-done">
        Concluídos
      </a>
      <a href="#" id="filter-pending">
        Pendentes
      </a>
    </div>
  );
};

const TodoItem = ({ todo }) => {
  return (
    <>
      {todo.done ? (
        <li style={{ textDecoration: "line-through" }}>{todo.text}</li>
      ) : (
        <li>
          {todo.text}
          <button>Concluir</button>
        </li>
      )}
    </>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([{ text: "Learn React", done: false }, { text: "Learn JS", done: true }]);


  return (
    <>
      <h1>Todo List</h1>
      <div className="center-content">
        Versão inicial da aplicação de lista de tarefas para a disciplina
        SPODWE2
      </div>
      <TodoFilter />
      <AddTodo />
      <ul id="todo-list">
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ul>
    </>
  );
};

export { TodoList };
