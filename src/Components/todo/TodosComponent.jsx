import { useState } from "react";
import {
  deleteTodoByIdApi,
  retrieveAllTodosForUsernameApi,
} from "./api/TodoApiService";
import { useEffect } from "react";

export default function TodosComponent() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDay()
  );

  const [todos, setTodos] = useState([]);

  useEffect(() => refreshTodos(), []);

  function refreshTodos() {
    retrieveAllTodosForUsernameApi("rexrk")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  const [message, setMessage] = useState(null);

  function deleteTodo(id) {
    deleteTodoByIdApi("rexrk", id)
      .then(() => {
        setMessage(`delete todo with id : ${id} successful`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      <h1>Things you want to do!</h1>
      {message != null && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>Description</td>
              <td>Is Done</td>
              <td>Target Date</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                {/* <td>{todo.targetDate.toDateString()}</td> */}
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
