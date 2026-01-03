import React, { useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and Password required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v2/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("admin", JSON.stringify(data.data.admin))
        navigate("/home/published");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/assets/frame.png" className="login-left" alt="frame" />
        <div className="card">
          <p>Uplift your product to market</p>
        </div>
      </div>

      
      <div className="login-right">
        <h2>Welcome to Productr Account</h2>

        <label>Email or Phone number</label>
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="signup-box">
          <p>Don’t have a Productr Account</p>
          <NavLink to="/signup">Signup here</NavLink>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
