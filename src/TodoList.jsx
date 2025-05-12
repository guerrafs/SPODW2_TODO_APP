import { useState, useEffect } from "react";

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
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const shouldRender = filter === "pending" ? false : true;
  const viewAll = filter === "all";

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    const newTodoData = { text };
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodoData),
      });
      if (!response.ok) {
        throw new Error("Erro ao adicionar o todo");
      }
      const addedTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
    } catch (error) {
      console.error("Erro ao adicionar o todo:", error);
    }
  };

  const markTodoAsDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: true }),
      });
      if (!response.ok) {
        throw new Error("Erro ao marcar o todo como concluído");
      }
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, done: true } : todo
        )
      );
    } catch (error) {
      console.error("Erro ao marcar o todo como concluído:", error);
    }
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
          ? todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} markTodoAsDone={markTodoAsDone} />
            ))
          : todos
              .filter((n) => n.done === shouldRender)
              .map((todo) => (
                <TodoItem key={todo.id} todo={todo} markTodoAsDone={markTodoAsDone} />
              ))}
      </ul>
    </>
  );
};

export { TodoList };
