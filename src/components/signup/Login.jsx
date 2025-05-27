import React, { useState } from "react";
import Register from "./Register";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Login() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email and password as an object
      const res = await axios.post("https://blogit-backend-nfpc.onrender.com/api/user/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      setMessage("✅ Login successful!");
      Swal.fire({
        title: "Login successful!",
        text: "You will be redirected to the home page.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      toast.success("🎉 Login successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage("❌ Invalid email or password.");
      toast.error("❌ Invalid email or password.");
      console.error(error);
    }
    
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "400px",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "5px",
        margin: "100px auto",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h2 className="mb-4">Login</h2>
      <div className="error-message">{message && <p>{message}</p>}</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
      </form>
      <div>
        <p className="mt-4">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
