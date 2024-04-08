import HeaderComponent from "../app/components/HeaderComponent";
import HeroesComponent from "../app/components/HeroesComponent";
import { useContext } from "react";
import { AuthContext } from "../app/contexts/AuthContext";

const IndexPage = () => {
  const { isLoggedIn, authUser } = useContext(AuthContext);

  const heroIds = [
    "ana",
    "ashe",
    "baptiste",
    "bastion",
    "brigitte",
    "dva",
    "doomfist",
    "echo",
    "genji",
    "hanzo",
    "illari",
    "junker-queen",
    "junkrat",
    "kiriko",
    "lifeweaver",
    "lucio",
    "cassidy",
    "mauga",
    "mei",
    "mercy",
    "moira",
    "orisa",
    "pharah",
    "ramattra",
    "reaper",
    "reinhardt",
    "roadhog",
    "sigma",
    "sojourn",
    "soldier-76",
    "sombra",
    "symmetra",
    "torbjorn",
    "tracer",
    "widowmaker",
    "winston",
    "wrecking-ball",
    "zarya",
    "zenyatta",
  ];

  console.log(authUser);

  return (
    <div>
      <HeaderComponent />
      <h1 className="index-title">Welcome to NextGen Stats</h1>
      <p className="index-desc-txt">View stats of Overwatch 2 players</p>
      <div className="loggedIn-text">
        {isLoggedIn ? (
          <p>You are logged in as {authUser}</p>
        ) : (
          <p>You are not logged in</p>
        )}
      </div>
      <HeroesComponent heroIds={heroIds} />
    </div>
  );
};

export default IndexPage;
