import { useContext, useEffect } from "react";
import { AuthContext } from "../app/contexts/AuthContext";
import HeaderComponent from "../app/components/HeaderComponent";
import UserProfileDataComponent from "../app/components/UserProfileDataviewComponent";
const ProfilePage = () => {
  const { isLoggedIn, authUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("isLoggedIn in profile:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div>
      <HeaderComponent />
      {isLoggedIn ? (
        <p>You are logged in as {authUser.username} </p>
      ) : (
        <p>You are not logged in</p>
      )}
      <UserProfileDataComponent />
    </div>
  );
};

export default ProfilePage;
