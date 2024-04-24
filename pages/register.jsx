import React from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../app/contexts/AuthContext";
import RegisterComponent from "../app/components/RegisterComponent";
import HeaderComponent from "../app/components/HeaderComponent";

const Register = () => {
  const { isLoggedIn } = useContext(AuthContext); // this needs to be on any page where I check to see if the user is logged in for certain content

  return (
    <div>
      <HeaderComponent />
      {isLoggedIn && <p className="login-notif">You are logged in</p>}
      {!isLoggedIn && <p className="login-notif">You are not logged in</p>}
      {!isLoggedIn && <RegisterComponent />}
    </div>
  );
};

export default Register;
