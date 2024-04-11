import React, { useState } from "react";
import { useRouter } from "next/router";
import PlayerStatSummaryComponent from "./PlayerStatSummaryComponent";
import "./componentStyles/SearchComponent.css";

const SearchComponent = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [consolidatedData, setConsolidatedData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    let battleTagAdjustment = searchQuery.replace(/#/g, "-");
    try {
      setLoading(true);
      const allDataResponse = await fetch(
        `/api/players/${battleTagAdjustment}/allData`
      );

      const allData = await allDataResponse.json();

      const statSummaryResponse = await fetch(
        `/api/players/${battleTagAdjustment}/statSummary`
      );
      const statSummary = await statSummaryResponse.json();
      setConsolidatedData({ ...allData, ...statSummary });
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the player data:", error);
    }
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search for a player</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          disabled={loading}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter Overwatch 2 Battletag"
          className="search-input"
        />
        <button className="search-button" type="submit" disabled={loading}>
          Search
        </button>
        {loading && <p className="loading-text">Loading...</p>}
      </form>
      <div className="data-container">
        {consolidatedData && (
          <PlayerStatSummaryComponent playerData={consolidatedData} />
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
