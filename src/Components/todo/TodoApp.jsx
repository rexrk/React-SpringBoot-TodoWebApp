import "./TodoApp.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HeaderComponent from "./HeaderComponent";

import WelcomeComponent from "./WelcomeComponent";
import TodosComponent from "./TodosComponent";

import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";

import ErrorComponent from "./ErrorComponent";

import AuthProvider, { useAuth } from "./security/AuthContext";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) {
    return children;
  }

  return <Navigate to="/" />;
}

export default function TodoApp() {
  return (
    <div className="todoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />

            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponent />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <TodosComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
