import HeaderComponent from "../app/components/HeaderComponent";
import { useAuth } from "../app/contexts/AuthContext";

const indexPage = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const login = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setAuthUser({ name: "John Doe" });
  };

  const logout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setAuthUser(null);
  };

  return (
    <div>
      <HeaderComponent />
      <h1>Welcome to NextGen Stats</h1>
      <p>View stats of Overwatch 2 players</p>

      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}

      {authUser && <p>Welcome, {authUser.name}</p>}
    </div>
  );
};

export default indexPage;
