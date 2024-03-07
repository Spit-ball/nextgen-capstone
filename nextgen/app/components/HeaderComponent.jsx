import React from "react";
import "./componentStyles/HeaderComponent.css";

const HeaderComponent = () => {
  return (
    <header className="header">
      <h1 className="header-title">Welcome to NextGen Stats</h1>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a href="/register" className="nav-link">
              Register
            </a>
          </li>
          <li className="nav-item">
            <a href="/search" className="nav-link">
              Search
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
