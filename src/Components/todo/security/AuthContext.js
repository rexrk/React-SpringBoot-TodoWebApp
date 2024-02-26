import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthentication] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // function login(username, password) {
  //   if (username === "rexrk" && password === "res") {
  //     setAuthentication(true);
  //     setUsername(username)
  //     return true;
  //   } else {
  //     setAuthentication(false);
  //     setUsername(null)
  //     return false;
  //   }
  // }
  async function login(username, password) {
    const baToken = "Basic " + window.btoa(username + ":" + password);
    try {
      const response = await executeBasicAuthenticationService(baToken);

      if (response.status == 200) {
        setAuthentication(true);
        setUsername(username);
        setToken(baToken);
        
        apiClient.interceptors.request.use(
          (config) => {
            console.log('intercepting and adding a token')
            config.headers.Authorization = baToken
            return config
          }
        )

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthentication(false);
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
}
