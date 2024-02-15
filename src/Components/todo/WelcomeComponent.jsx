import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  /*retrieveHelloWorldBean,*/ retrieveHelloWorldPathVariable,
} from "./api/HelloWorldApiService";

function WelcomeComponent() {
  const { username } = useParams();
  const [message, setMessage] = useState();

  function callHelloWorldRestApi() {
    // axios
    //   .get("http://localhost:8080/hello-world")
    //   .then((response) => SuccessfulResponse(response))
    //   .catch((error) => ErrorResponse(error))
    //   .finally(console.log("cleanup"));

    // retrieveHelloWorldBean()
    retrieveHelloWorldPathVariable(username)
      .then((response) => SuccessfulResponse(response))
      .catch((error) => ErrorResponse(error))
      .finally(console.log("cleanup"));
  }

  function SuccessfulResponse(response) {
    console.log(response);
    setMessage(response.data.message);
  }

  function ErrorResponse(error) {
    console.log("error" + error);
  }

  return (
    <div className="welcomeComponent">
      <h1>Welcome {username}</h1>
      <div>Personalized app for todos.</div>
      <div>
        <button className="btn btn-primary m-3" onClick={callHelloWorldRestApi}>
          Hello World Api
        </button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomeComponent;
