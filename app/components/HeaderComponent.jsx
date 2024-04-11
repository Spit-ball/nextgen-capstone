import React, { useContext, useState } from "react";
import Link from "next/link";
import "./componentStyles/HeaderComponent.css";
import { AuthContext } from "../contexts/AuthContext";

const HeaderComponent = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <h1 className="header-title">NextGen Stats</h1>
      <nav className={`header-nav${isMenuOpen ? "open" : ""}`}>
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
      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default HeaderComponent;
