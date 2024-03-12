// TODO: Add save button for stat card; saves to logged in users profile page via savedPlayers.js model

import React, { useState } from "react";


const PlayerStatSummaryComponent = ({ playerData }) => {
  const [selectedHero, setSelectedHero] = useState(Object.keys(heroes)[0]); // set the default selected hero to the first hero in the list
  if (
    !playerData ||
    !playerData.general ||
    !playerData.roles ||
    !playerData.heroes ||
    !playerData.summary
  ) {
    return;
  }

  const { general, roles, heroes, summary } = playerData; // destructure the playerData object into the only 3 keys we need for the summary

  return (
    <div>
      <>
        {/*Conditional check for player data and then moving on to search through and map the summary key/value pairs. Just looking for username and title at the moment*/}
        <div>
          <p>Username: {summary.username}</p>
          <p>Title: {summary.title}</p>
          <h2>Stats</h2>
          {/*Conditional check for player data, then moving through summary to get to competitive on PC, then extracting the season, and mapping the role, division, and tier data to display*/}
          {summary?.competitive?.pc && (
            <div>
              <p>{`Season: ${summary.competitive.pc.season}`}</p>
              {["tank", "damage", "support"].map((role) => {
                const roleData = summary.competitive.pc[role];
                if (roleData) {
                  return (
                    <div key={role}>
                      <h3>{`${
                        role.charAt(0).toUpperCase() + role.slice(1)
                      }`}</h3>
                      {roleData.division && (
                        <p>{`Division: ${roleData.division}`}</p>
                      )}
                      {roleData.tier && <p>{`Tier: ${roleData.tier}`}</p>}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </>
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
        {Object.keys(heroes).map((hero) => (
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
