import HeaderComponent from "../app/components/HeaderComponent";

const indexPage = () => {
  return (
    <div>
      {<HeaderComponent />}
      <h1>Welcome to NextGen Stats</h1>
      <p>View stats of Overwatch 2 players</p>
    </div>
  );
};

export default indexPage;
