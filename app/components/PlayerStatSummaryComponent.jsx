// TODO: Add save button for stat card; saves to logged in users profile page via savedPlayers.js model

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

  const renderStats = (title, stats) => (
    <div className="section">
      <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
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
            <td>{stats.winrate}</td>
          </tr>
          <tr>
            <th>KDA</th>
            <td>{stats.kda}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="player-stat-summary">
      <div className="section">
        <p>Username: {summary.username}</p>
        <p>Title: {summary.title}</p>
      </div>
      <div className="section">
        <h2>My Hero</h2>
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
        {heroes[selectedHero] &&
          renderStats(selectedHero, heroes[selectedHero])}
      </div>
      <div className="section">
        <h2>Season</h2>
        <p>{`Season: ${summary.competitive.pc.season}`}</p>
      </div>
      {renderStats("General Stats", general)}
      {Object.entries(roles).map(([role, stats]) =>
        renderStats(
          `${role.charAt(0).toUpperCase() + role.slice(1)} Stats`,
          stats
        )
      )}
    </div>
  );
};

export default PlayerStatSummaryComponent;
