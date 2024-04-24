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
    try {
      setLoading(true);
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
      setAuthUser(data.user);
    } catch (error) {
      console.error("There was an error saving the BattleTag:", error);
    }
    setLoading(false);
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
      <h1 className="search-title">Search for a player by BattleTag</h1>
      <div className="search-instructions">
        <p className="search-instructions-para">
          Enter a BattleTag to search for a player's stats.
        </p>
        <p>
          Searches are case-sensitive and must include the # symbol and a
          number.
        </p>
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          required={searchQuery.length}
          pattern="^\S*#\S*[0-9]+\S*$" // regex to ensure the battleTag has a # symbol, no spaces and at least one number.
          disabled={loading}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter BattleTag: JohnDoe#1234"
          className="search-input"
        />
        <button
          className="search-button"
          type="submit"
          disabled={
            loading ||
            !searchQuery || // disables the search button if the searchQuery is empty
            new RegExp("^S*#S*[0-9]+S*$").test(searchQuery) == true // tests the battleTag against the regex pattern to ensure it's valid before searching
          }
        >
          Search 🔍
        </button>
        {isLoggedIn && (
          <button
            type="button" // ensures that the save button doesn't submit the form
            className="save-button"
            onClick={handleSaveBattleTag}
            disabled={
              authUser.savedBattleTags.includes(searchQuery) ||
              !searchQuery || // disables the save button if the searchQuery is empty
              new RegExp("^S*#S*[0-9]+S*$").test(searchQuery) == true // tests the battleTag against the regex pattern to ensure it's valid before saving
            }
          >
            {/* changes the button text to "Saved" if the battleTag is already saved */}
            {authUser.savedBattleTags.includes(searchQuery)
              ? "Saved ✅" // ✅ is a checkmark emoji <3
              : "Save"}{" "}
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
