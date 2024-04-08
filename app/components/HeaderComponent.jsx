import React, { useContext } from "react";
import Link from "next/link";
import "./componentStyles/HeaderComponent.css";
import { AuthContext } from "../contexts/AuthContext";

const HeaderComponent = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <header className="header">
      <h1 className="header-title">NextGen Stats</h1>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link href="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link href="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link href="/search">Search</Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="nav-item">
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
