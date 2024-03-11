import HeaderComponent from "../app/components/HeaderComponent";
import { useContext } from "react";
import { AuthContext } from "../app/contexts/AuthContext";

const IndexPage = () => {
  const { isLoggedIn, authUser } = useContext(AuthContext);

  console.log(authUser);

  return (
    <div>
      <HeaderComponent />
      <h1>Welcome to NextGen Stats</h1>
      <p>View stats of Overwatch 2 players</p>
      {isLoggedIn ? (
        <p>You are logged in as {authUser}</p>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
};

export default IndexPage;
