import React, { useEffect, useState } from "react";
import "./componentStyles/PlayerStatSummaryComponent.css";

const PlayerStatSummaryComponent = ({ playerData }) => {
  const [selectedHero, setSelectedHero] = useState("");

  useEffect(() => {
    if (playerData && playerData.heroes) {
      setSelectedHero(Object.keys(playerData.heroes)[0]);
    }
  }, [playerData]);

  if (
    !playerData ||
    !playerData.general ||
    !playerData.roles ||
    !playerData.heroes ||
    !playerData.summary
  ) {
    return null;
  }

  const { general, roles, heroes, summary } = playerData;

  const renderStats = (title, stats) => {
    const winrate = Math.round(stats.winrate);

    return (
      <div className="section">
        <h2 className="chosen-hero">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h2>
        <table>
          <tbody>
            <tr>
              <th>Games won</th>
              <td>{stats.games_won}</td>
            </tr>
            <tr>
              <th>Games lost</th>
              <td>{stats.games_lost}</td>
            </tr>
            <tr>
              <th>Winrate</th>
              <td>{winrate}%</td>
            </tr>
            <tr>
              <th>KDA</th>
              <td>{stats.kda}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="player-stat-summary">
      <div className="section">
        <p className="player-username">Username: {summary.username}</p>
        <p className="player-title">Title: {summary.title}</p>
      </div>
      <div className="section">
        <h2>Season {summary.competitive.pc.season}</h2>
      </div>
      <div className="section">
        <h2>Select Your Hero</h2>
        <select
          id="champSelect"
          onChange={() =>
            setSelectedHero(document.getElementById("champSelect").value)
          }
        >
          {Object.keys(heroes).map((hero, index) => (
            <option key={index} value={hero}>
              {hero
                .replace(/-/g, " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
      </div>
      {heroes[selectedHero] && renderStats(selectedHero, heroes[selectedHero])}
      {renderStats("General Stats", general)}
      {["Tank", "Damage", "Support"].map((role) => {
        const stats = roles[role.toLowerCase()]; // this converts back to lowercase for the API call to get the stats because the object keys are all lowercase
        if (stats) {
          return renderStats(
            `${role.charAt(0).toUpperCase() + role.slice(1)} Stats`,
            stats
          );
        }
      })}
    </div>
  );
};

export default PlayerStatSummaryComponent;
