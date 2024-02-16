import { useState } from "react";
import {
  deleteTodoByIdApi,
  retrieveAllTodosForUsernameApi,
} from "./api/TodoApiService";
import { useEffect } from "react";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

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
  
  const navigate = useNavigate()
  
  function updateTodo(id) {
    navigate(`/todo/${id}`)
  }

  function addNewTodo() {
    navigate(`/todo/-1`)
  }

  return (
    <div className="container">
      <h1>Things you want to do!</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">

          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done</th>
              <th>Target Date</th>
              <th className="text-danger">Delete</th>
              <th className="text-info">Update</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done ? "Yes" : "No"}</td>
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
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      updateTodo(todo.id);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><button className="btn btn-primary m-5" onClick={addNewTodo}>Add New Todo</button></div>
      </div>
    </div>
  );
}
