import router from "next/router";
import HeaderComponent from "../components/HeaderComponent";
import { useState } from "react";

// export default const vs. export const

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password", password);
    console.log("Name", name);

    const response = await fetch("/api/userProfile/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name }),
    });

    if (response.ok) {
      console.log("User profile created successfully");
      // redirect to login page
      router.push("/login");
    } else {
      console.error("Error creating user profile");
    }
  };

  return (
    <>
      <HeaderComponent />
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
