import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      <Image
        src="/assets/ng_logo.png"
        className="header-title"
        width={200}
        height={100}
        alt="NextGen Stats"
      />
      <nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <div className="nav-container">
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
          </div>
        </ul>
      </nav>
      <div
        className={`menu-toggle ${isMenuOpen ? "hidden" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default HeaderComponent;
