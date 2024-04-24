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
        <form
          className="header-search-form"
          onSubmit={(e) => searchQuery && handleSearch(e)} // only submit if there is a search query
        >
          <input
            required={searchQuery.length} // red border if no search query on focus
            pattern="^\S*#\S*[0-9]+\S*$"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a player by BattleTag"
            className="header-search-input"
          />
          <button
            className="header-search-button"
            type="submit"
            disabled={
              !searchQuery ||
              new RegExp("^S*#S*[0-9]+S*$").test(searchQuery) == true
            }
          >
            Search
          </button>
        </form>
      )}
      <nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
        <div className="nav-container">
          <ul className="nav-list">
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
          </ul>
        </div>
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
