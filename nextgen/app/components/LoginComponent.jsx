import React from "react";
import "./componentStyles/LoginComponent.css";
const LoginComponent = () => {
  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <input type="text" placeholder="Username" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
