import React, { useState } from "react";

const PlayerStatSummaryComponent = ({ playerData }) => {
  const [selectedHero, setSelectedHero] = useState("ana");

  if (
    !playerData ||
    !playerData.general ||
    !playerData.roles ||
    !playerData.heroes
  ) {
    return;
  }

  const { general, roles, heroes } = playerData; // destructure the playerData object into the only 3 keys we need for the summary

  return (
    <div>
      <h1>General stats</h1>
      <p>Games won: {general.games_won}</p>
      <p>Games lost: {general.games_lost}</p>
      <p>Winrate: {general.winrate}</p>
      <p>KDA: {general.kda}</p>

      {/*mapping over the role and stats for each that are provided by OverFast*/}

      {Object.entries(roles).map(([role, stats]) => (
        <div key={role}>
          <h2>{role} stats</h2>
          <p>Games won: {stats.games_won}</p>
          <p>Games lost: {stats.games_lost}</p>
          <p>Winrate: {stats.winrate}</p>
          <p>KDA: {stats.kda}</p>
        </div>
      ))}

      {/*mapping over specific heros and stats for each that are provided by OverFast*/}

      <select
        id="champSelect"
        onChange={() =>
          setSelectedHero(document.getElementById("champSelect").value)
        }
      >
        {Object.entries(heroes).map(([hero]) => (
          <option value={hero}>{hero}</option>
        ))}
      </select>
      <div>
        {/*capitalize first letter of hero name, if not already*/}
        <p>Games won: {heroes[selectedHero].games_won}</p>
        <p>Games lost: {heroes[selectedHero].games_lost}</p>
        <p>Winrate: {heroes[selectedHero].winrate}</p>
        <p>KDA: {heroes[selectedHero].kda}</p>
      </div>
    </div>
  );
};

export default PlayerStatSummaryComponent;
