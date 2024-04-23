import React, { useContext } from "react";
import { AuthContext } from "../app/contexts/AuthContext";
import HeaderComponent from "../app/components/HeaderComponent";
import SearchComponent from "../app/components/SearchComponent";

const SearchPage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <HeaderComponent showSearch={true} />
      {isLoggedIn && <p className="login-notif">You are logged in</p>}
      {!isLoggedIn && (
        <p className="login-notif">
          You are not logged in.
          <br /> You must log in to save searched players.
        </p>
      )}
      <SearchComponent />
    </div>
  );
};

export default SearchPage;
