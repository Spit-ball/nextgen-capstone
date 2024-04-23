import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import PlayerStatSummaryComponent from "./PlayerStatSummaryComponent";
import "./componentStyles/SearchComponent.css";
import { BattleTagContext } from "../contexts/BattleTagContext";
import { AuthContext } from "../contexts/AuthContext";

const SearchComponent = ({ battleTag }) => {
  const router = useRouter();

  const { battleTag: urlBattleTag } = router.query;

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [consolidatedData, setConsolidatedData] = useState(null);
  const [autoSearch, setAutoSearch] = useState(false);

  const { saveBattleTag } = useContext(BattleTagContext);
  const { isLoggedIn, authUser, setAuthUser } = useContext(AuthContext);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery) {
      alert("Please enter a BattleTag");
      return;
    }
    if (searchQuery.includes(" ")) {
      alert("BattleTag cannot contain spaces");
      return;
    }
    if (!searchQuery.includes("#")) {
      alert("Please enter a valid BattleTag including a # symbol");
      return;
    }
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

  const handleSaveBattleTag = async () => {
    if (!searchQuery) return;
    if (searchQuery.includes(" ")) {
      alert("BattleTag cannot contain spaces");
      return;
    }
    if (!searchQuery.includes("#")) {
      alert("Please enter a valid BattleTag including a # symbol");
      return;
    }
    try {
      const response = await fetch("/api/saveBattleTag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: authUser._id, battleTag: searchQuery }),
      });

      if (!response.ok) {
        throw new Error("There was an error saving the BattleTag");
      }

      const data = await response.json();
      console.log("BattleTag saved successfully:", data);
      setAuthUser(data.user);
    } catch (error) {
      console.error("There was an error saving the BattleTag:", error);
    }
  };

  // decoding the encodedURI from /profile page to display the battleTag in the search bar and then search for it
  useEffect(() => {
    if (urlBattleTag) {
      setSearchQuery(decodeURIComponent(urlBattleTag));
      setAutoSearch(true);
    }
  }, [urlBattleTag]);

  // auto search for the battleTag when the page loads with a battleTag in the URL
  useEffect(() => {
    if (searchQuery && autoSearch) {
      handleSearch();
      setAutoSearch(false);
    }
  }, [searchQuery, autoSearch]);

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
        {isLoggedIn && (
          <button
            className="save-button"
            onClick={handleSaveBattleTag}
            disabled={loading}
          >
            Save
          </button>
        )}
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
