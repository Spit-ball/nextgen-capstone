import { useContext, useEffect } from "react";
import { AuthContext } from "../app/contexts/AuthContext";
import HeaderComponent from "../app/components/HeaderComponent";

const ProfilePage = () => {
  const { isLoggedIn, authUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("isLoggedIn in profile:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div>
      <HeaderComponent />
      {isLoggedIn ? (
        <p>You are logged in as {authUser} </p>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
};

export default ProfilePage;
