import React from "react";

const AllPlayerDataComponent = ({ playerData }) => {
  return (
    <>
      {/*Conditional check for player data and then moving on to search through and map the summary key/value pairs. Just looking for username and title at the moment*/}
      {playerData?.summary && (
        <div>
          {Object.entries(playerData.summary).map(([key, value]) => {
            if (key === "username" || key === "title") {
              return <p key={key}>{`${key}: ${value}`}</p>;
            }
            return null;
          })}

          <h2>Stats</h2>
          {/*Conditional check for player data, then moving through summary to get to competitive on PC, then extracting the season, and mapping the role, division, and tier data to display*/}
          {playerData?.summary?.competitive?.pc && (
            <div>
              <p>{`Season: ${playerData.summary.competitive.pc.season}`}</p>
              {["tank", "damage", "support"].map((role) => {
                const roleData = playerData.summary.competitive.pc[role];
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
      )}
    </>
  );
};

export default AllPlayerDataComponent;
