import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import "./componentStyles/HeaderComponent.css";
import { AuthContext } from "../contexts/AuthContext";

const HeaderComponent = ({ showSearch }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchQuery) {
      alert("Please enter a BattleTag");
      return;
    }
    if (searchQuery.includes(" ")) {
      alert("BattleTag cannot contain spaces");
      return;
    }
    if (!searchQuery.includes("#")) {
      alert("Please enter a valid BattleTag including a # symbol");
      return;
    }
    router.push(`/search?battleTag=${encodeURIComponent(searchQuery)}`); // encoding the URI component to handle special characters like the # symbol for battletags
  };

  return (
    <header className="header">
      <Link href="/">
        <Image
          src="/assets/ng_logo.png"
          className="header-title"
          width={250}
          height={100}
          alt="NextGen Stats"
        />
      </Link>
      {showSearch && (
        <form className="header-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a player by BattleTag"
            className="header-search-input"
          />
          <button className="header-search-button" type="submit">
            Search
          </button>
        </form>
      )}
      <nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <div className="nav-container">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" href="/login">
                  Login
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" href="/register">
                  Register
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link href="/search" className="nav-link">
                Search
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" href="/profile">
                  Profile
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" href="/" onClick={logout}>
                  Logout
                </Link>
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
