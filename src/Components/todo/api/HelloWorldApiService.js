import { apiClient } from "./ApiClient";

// 1st Method
// export function retrieveHelloWorldBean() {
//   return axios.get("http://localhost:8080/hello-world-bean");
// }

export const retrieveHelloWorldBean = () => apiClient.get("/hello-world-bean");

// export const retrieveHelloWorldPathVariable = (username, token) =>
export const retrieveHelloWorldPathVariable = (username) =>
  apiClient.get(`/hello-world/path-variable/${username}`
  // , {
  //   headers: {
  //     Authorization: token,
  //   },
  // }
  );

