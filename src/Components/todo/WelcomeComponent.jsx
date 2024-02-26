import { useState } from "react";
import { useParams } from "react-router-dom";
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent() {
  const { username } = useParams();
  const [message, setMessage] = useState();
  const authContext = useAuth();
  function callHelloWorldRestApi() {
    retrieveHelloWorldPathVariable("krxer", authContext.token)
      .then((response) => SuccessfulResponse(response))
      .catch((error) => ErrorResponse(error))
      .finally(console.log("cleanup"));
  }

  function SuccessfulResponse(response) {
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
