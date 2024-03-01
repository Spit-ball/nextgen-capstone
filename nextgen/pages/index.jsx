// some of this needs to be on the search page

import React, { useState } from "react";
import getPlayersById from "./api/players/getPlayersById";

const indexPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    let battleTagAdjustment = searchQuery.replace(/#/g, "-");
    console.log(battleTagAdjustment);
    try {
      const data = await getPlayersById(battleTagAdjustment);
      console.log(data);
    } catch (error) {
      console.error("Error fetching the OverFast data:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to NextGen Stats</h1>
      <p>View stats of Overwatch 2 players</p>
      search for players
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter Overwatch 2 Battletag"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default indexPage;
