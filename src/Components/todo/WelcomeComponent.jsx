import { useParams } from "react-router-dom";

function WelcomeComponent() {
  const { username } = useParams();
  return (
    <div className="welcomeComponent">
      <h1>Welcome {username}</h1>
      <div>Personalized app for todos.</div>
    </div>
  );
}

export default WelcomeComponent