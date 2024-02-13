import { useState } from "react";
import { retrieveAllTodosForUsername } from "./api/TodoApiService";
import { useEffect } from "react";

export default function TodosComponent() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDay()
  );

  const [todos, setTodos] = useState([])

  useEffect(
    () => refreshTodos(), []
  )
    
  function refreshTodos() {
    retrieveAllTodosForUsername('rexrk')
      .then( response =>
        {
          console.log(response.data)
          setTodos(response.data)
        }
      )
      .catch( (error) => console.log(error) )
  }


  return (
    <div className="container">
      <h1>Things you want to do!</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Description</td>
              <td>Is Done</td>
              <td>Target Date</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                {/* <td>{todo.targetDate.toDateString()}</td> */}
                <td>{todo.targetDate.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
