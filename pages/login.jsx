import { useContext, useEffect } from "react";
import HeaderComponent from "../app/components/HeaderComponent";
import LoginComponent from "../app/components/LoginComponent";
import { AuthContext } from "../app/contexts/AuthContext";

const Login = () => {
  const { isLoggedIn } = useContext(AuthContext); // this needs to be on any page where I check to see if the user is logged in for certain content

  return (
    <div>
      <HeaderComponent />

      {isLoggedIn && <p className="login-notif">You are logged in</p>}
      {!isLoggedIn && <p className="login-notif">You are not logged in</p>}
      {!isLoggedIn && <LoginComponent />}
    </div>
  );
};
export default Login;
