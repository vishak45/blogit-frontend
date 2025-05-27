import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://blogit-backend-nfpc.onrender.com/api/user/register", {
        name,
        email,
        password,
      });
      if (res.status === 201) {
        Swal.fire({
          title: "Registration successful!",
          text: "You will be redirected to the login page.",
          icon: "success",
        });
        navigate("/signup");
        toast.success("🎉 Registration successful!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("❌ User already exists or Server Error.");
      toast.error("❌ User already exists.");
      toast.error("❌ Registration failed.");
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
        backgroundColor: "#f8f9fa",
        margin: "100px auto",
      }}
    >
      <h2 className="mb-4">Register</h2>
      <div className="error-message">{message && <p>{message}</p>}</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
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
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
        <p className="mt-2">
          Already have an account? <Link to="/signup">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
