import router from "next/router";
import { useState } from "react";
import "./componentStyles/RegisterComponent.css";

// export default const vs. export const

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/userProfile/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name }),
    });

    if (response.ok) {
      // redirect to login page
      router.push("/login");
    } else {
      const data = await response.json();
      alert(data.error);
      setLoading(false);
      console.error("Error creating user profile");
    }
  };

  return (
    <>
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            disabled={loading}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="register-input"
          />
          <input
            disabled={loading}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="register-input"
          />
          <input
            disabled={loading}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="register-input"
          />
          <button className="register-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
