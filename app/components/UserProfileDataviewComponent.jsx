// TODO: Add a DeleteTag button to each saved tag in the user profile...preferably through a dialog box with checkboxes for each tag to delete and a confirmation button...or a delete button next to each tag that deletes the tag on click

import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Link from "next/link";
import "./componentStyles/UserProfileDataviewComponent.css";

const UserProfileDataComponent = () => {
  const { authUser } = useContext(AuthContext);

  // These will be for editing the user profile later...

  // const [realName, setRealName] = useState("");
  // const [username, setUsername] = useState("");
  // const [role, setRole] = useState("");

  return (
    <>
      <div className="user-profile-data-container">
        {authUser ? (
          <>
            <h1 className="user-profile-data-title">
              Welcome, {authUser.username}
            </h1>
            <div className="user-profile-data">
              <p className="user-profile-data-item">
                Real Name: {authUser.name}
              </p>
              <p className="user-profile-data-item role">
                Role: {authUser.role}
              </p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {authUser && (
        <>
          <div className="user-profile-saved-battletags-container">
            <p className="user-profile-saved-battletags-title">
              Saved BattleTags:
            </p>
            <div className="user-profile-saved-battletags-list">
              {authUser.savedBattleTags.map((battleTag, index) => (
                <Link
                  className="user-profile-saved-battletags-item"
                  key={index}
                  href={`/search?battleTag=${encodeURIComponent(battleTag)}`}
                >
                  {index > 0}
                  {battleTag}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfileDataComponent;
