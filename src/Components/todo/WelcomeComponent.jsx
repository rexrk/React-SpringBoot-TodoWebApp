import axios from "axios";
import { useParams } from "react-router-dom";

function WelcomeComponent() {
  function callHelloWorldRestApi() {
    console.log("called");
    axios
    .get("http://localhost:8080/hello-world     ")
    .then((response) => SuccessfulResponse(response))
    .catch((error) => ErrorResponse(error))
    .finally(console.log('cleanup'))
  }

  function SuccessfulResponse(response) {
    console.log(response)
  }

  function ErrorResponse(error) {
    console.log('error' + error)
  }

  const { username } = useParams();
  return (
    <div className="welcomeComponent">
      <h1>Welcome {username}</h1>
      <div>Personalized app for todos.</div>
      <div>
        <button className="btn btn-primary m-3" onClick={callHelloWorldRestApi}>
          Hello World Api
        </button>
      </div>
    </div>
  );
}

export default WelcomeComponent;
