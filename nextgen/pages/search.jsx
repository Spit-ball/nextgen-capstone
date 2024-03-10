import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PlayerSummaryComponent from "../app/components/PlayerSummaryComponent";
import PlayerStatSummaryComponent from "../app/components/PlayerStatSummaryComponent";
import HeaderComponent from "../app/components/HeaderComponent";

const Search = () => {
  const router = useRouter(); // use this to reroute to login later

  const [searchQuery, setSearchQuery] = useState(""); // original search state

  const [allData, setAllData] = useState(null); // this is for ALL of the data I can get from the API...25000+ lines of data..., but the statSummary doesnt include the username or title, so I use this to get that info.

  const [statSummary, setStatSummary] = useState(null); // this is for the summary of the data I can get from the API...much smaller than allData

  const handleSearch = async (e) => {
    e.preventDefault();
    let battleTagAdjustment = searchQuery.replace(/#/g, "-"); // replace # with - for the URL
    try {
      const allDataResponse = await fetch(
        `/api/players/${battleTagAdjustment}/allData` // fetch ALL of the player data
      );
      const allData = await allDataResponse.json();
      setAllData(allData);
    } catch (error) {
      console.error(
        "There was an error fetching all of the player data:",
        error
      );
    }
    try {
      const statSummaryResponse = await fetch(
        `/api/players/${battleTagAdjustment}/statSummary` // fetch the summary of the player data
      );
      const statSummary = await statSummaryResponse.json();
      setStatSummary(statSummary);
    } catch (error) {
      console.error(
        "There was an error fetching the player data summary:",
        error
      );
    }
  };

  return (
    <div>
      <HeaderComponent />
      <h1>Search for a player</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter Overwatch 2 Battletag"
        />
        <button type="submit">Search</button>
      </form>
      {allData && <PlayerSummaryComponent playerData={allData} />}
      {statSummary && <PlayerStatSummaryComponent playerData={statSummary} />}
    </div>
  );
};

export default Search;
