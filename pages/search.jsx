import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PlayerStatSummaryComponent from "../app/components/PlayerStatSummaryComponent";
import HeaderComponent from "../app/components/HeaderComponent";

const Search = () => {
  const router = useRouter(); // use this to reroute to login later

  const [loading, setLoading] = useState(false); // set loading to true when fetching data

  const [searchQuery, setSearchQuery] = useState(""); // original search state

  const [allData, setAllData] = useState(null); // this is for ALL of the data I can get from the API...25000+ lines of data..., but the statSummary doesnt include the username or title, so I use this to get that info.

  const [statSummary, setStatSummary] = useState(null); // this is for the summary of the data I can get from the API...much smaller than allData

  const [consolidatedData, setConsolidatedData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    let battleTagAdjustment = searchQuery.replace(/#/g, "-"); // replace # with - for the URL
    try {
      setLoading(true);
      const allDataResponse = await fetch(
        `/api/players/${battleTagAdjustment}/allData` // fetch ALL of the player data
      );

      const allData = await allDataResponse.json();

      const statSummaryResponse = await fetch(
        `/api/players/${battleTagAdjustment}/statSummary` // fetch the summary of the player data
      );
      const statSummary = await statSummaryResponse.json();
      setConsolidatedData({ ...allData, ...statSummary });
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the player data:", error);
    }
  };

  return (
    <div>
      <HeaderComponent />
      <h1>Search for a player</h1>
      <form onSubmit={handleSearch}>
        <input
          disabled={loading}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter Overwatch 2 Battletag"
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
        {loading && <p>Loading...</p>}
      </form>
      {consolidatedData && (
        <>
          <PlayerStatSummaryComponent playerData={consolidatedData} />
        </>
      )}
    </div>
  );
};

export default Search;
