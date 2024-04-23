import HeaderComponent from "../app/components/HeaderComponent";
import HeroesComponent from "../app/components/HeroesComponent";
import { useContext } from "react";
import { AuthContext } from "../app/contexts/AuthContext";
import Link from "next/link";

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
      <HeaderComponent showSearch={true} />
      <div className="index-content">
        <div className="index-welcome-section">
          <h1>Welcome to NextGen Stats</h1>
          <div className="loggedIn-text">
            {isLoggedIn ? (
              <p>You are logged in as {authUser.username}</p>
            ) : (
              <p>You are not logged in</p>
            )}
          </div>
        </div>
        <div className="index-main">
          <div className="index-main-section-1">
            <h2 className="section-heading">Features</h2>
            <ul className="features-list">
              <li>Real-Time Tracking</li>
              <li>Hero Specific Stats</li>
              <li>Seasonal Updates</li>
              <li>Compare with Other Friends</li>
            </ul>
          </div>
          <div className="index-main-section-2">
            <h2 className="section-heading">How It Works</h2>
            <ol className="functions-list">
              <li>
                <Link href="/register">Sign Up</Link>
              </li>
              <li>
                <Link href="/search">Search Public BattleTags</Link>
              </li>
              <li>Track and Analyze</li>
              <li>Improve and Dominate</li>
            </ol>
          </div>
        </div>
        <div className="index-main-section-3">
          <p className="site-desc-title">
            Join the NextGen Stats Community Today:
          </p>
          <p className="site-desc">
            Ready to take your Overwatch 2 gameplay to the next level? <br />
            Start tracking your stats like never before. <br />
            With our powerful tool, you will be unstoppable on the battlefield.
            <br /> Sign up now and embark on your journey to gaming greatness
            with NextGen Stats.
          </p>
        </div>
        <HeroesComponent heroIds={heroIds} />
      </div>
    </div>
  );
};

export default IndexPage;
