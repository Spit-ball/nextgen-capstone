import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Router from "next/router";
import "./componentStyles/LoginComponent.css";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isLoggedIn } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      if (isLoggedIn) {
        Router.push("/");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          disabled={loading}
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          disabled={loading}
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">
          Login
        </button>
        <p>{loading && "Loading..."}</p>
      </form>
    </div>
  );
};

export default LoginComponent;
