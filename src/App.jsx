import { useState, useEffect } from 'react';
import "./App.css";
import Todo from "./components/Todo"; 
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";
import LoginPage from "./components/LoginPage";

function App() {
  const [user, setUser] = useState(null); // Estado para controlar o usuário autenticado
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  useEffect(() => {
    // Carrega as tarefas ao montar o componente
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/todo');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Erro ao carregar lista de tarefas:', error);
    }
  };

  const addTodo = async (text, description) => {
    try {
      const response = await fetch('/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token de autenticação no cabeçalho
        },
        body: JSON.stringify({
          text,
          description,
          completed: false,
        }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };
 
  const removeTodo = async (id) => {
    try {
      await fetch(`/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token de autenticação no cabeçalho
        }
      });
      const newTodos = todos.filter(todo => todo.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await fetch(`/todo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token de autenticação no cabeçalho
        },
        body: JSON.stringify({
          completed: true,
        }),
      });
      const updatedTodo = await response.json();
      const newTodos = todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.error('Erro ao completar tarefa:', error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      localStorage.setItem('token', data.token); // Salva o token de autenticação no localStorage
      setUser(true); // Define o usuário como autenticado
    } catch (error) {
      console.error('Erro ao efetuar login:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token de autenticação do localStorage
    setUser(null); // Define o usuário como não autenticado
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      {user ? (
        <>
          <button onClick={handleLogout}>Sair</button>
          <Search search={search} setSearch={setSearch} />
          <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
          <div className="todo-list">
            {todos
              .filter(todo =>
                filter === "All"
                  ? true
                  : filter === "Completed"
                  ? todo.completed
                  : !todo.completed
              )
              .filter(todo =>
                todo.text.toLowerCase().includes(search.toLowerCase())
              )
              .sort((a, b) =>
                sort === "Asc"
                  ? a.text.localeCompare(b.text)
                  : b.text.localeCompare(a.text)
              )
              .map(todo => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  removeTodo={removeTodo}
                  completeTodo={completeTodo}
                />
              ))}
          </div>
          <TodoForm addTodo={addTodo} />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
