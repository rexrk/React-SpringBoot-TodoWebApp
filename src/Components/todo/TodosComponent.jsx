import { useState } from "react";
import {
  deleteTodoByIdApi,
  retrieveAllTodosForUsernameApi,
} from "./api/TodoApiService";
import { useEffect } from "react";
import { useAuth } from "./security/AuthContext";

export default function TodosComponent() {
  const [todos, setTodos] = useState([]);
  const authContext = useAuth()
  const username = authContext.username

  useEffect(() => refreshTodos(), []);

  function refreshTodos() {
    retrieveAllTodosForUsernameApi(username)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  const [message, setMessage] = useState(null);

  function deleteTodo(id) {
    deleteTodoByIdApi(username, id)
      .then(() => {
        setMessage(`delete todo with id : ${id} successful`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      <h1>Things you want to do!</h1>
      {message && <div className="alert alert-warning">{message}</div>}
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
