import React from "react";

const Todo = ({ todo, removeTodo, completeTodo }) => {
  const handleCompleteTodo = () => {
    completeTodo(todo.id);
  };

  return (
    <div className="todo" style={{ textDecoration: todo.completed ? "line-through" : "" }}>
      <div className="content">
        <p>{todo.text}</p>
        <p className="description">{todo.description}</p>
      </div>
      <div>
        <button className="complete" onClick={handleCompleteTodo}>Completar</button>
        <button className="remove" onClick={() => removeTodo(todo.id)}>x</button>
      </div>
    </div>
  );
};

export default Todo;
