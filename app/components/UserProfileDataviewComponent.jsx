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
    <div className="user-profile-data-container">
      {authUser ? (
        <>
          <h1 className="user-profile-data-title">
            Welcome, {authUser.username}
          </h1>
          <div className="user-profile-data">
            <p className="user-profile-data-item">Real Name: {authUser.name}</p>
            <p className="user-profile-data-item">
              Username: {authUser.username}
            </p>
            <p className="user-profile-data-item role">Role: {authUser.role}</p>
          </div>
          <p className="user-profile-saved-battletags-title">
            Saved BattleTags:
          </p>
          <div>
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfileDataComponent;
