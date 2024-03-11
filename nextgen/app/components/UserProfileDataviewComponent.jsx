import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./componentStyles/UserProfileDataviewComponent.css";

const UserProfileDataComponent = () => {
  const { authUser } = useAuth();
  const [realName, setRealName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="user-profile-data-container">
      <h1 className="user-profile-data-title">Welcome, {authUser}</h1>
      <div className="user-profile-data">
        <p className="user-profile-data-item">Real Name: {realName}</p>
        <p className="user-profile-data-item">Username: {username}</p>
        <p className="user-profile-data-item">Role: {role}</p>
      </div>
      <button className="edit-profile-button">Edit Profile</button>
    </div>
  );
};

export default UserProfileDataComponent;
