import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/auth/login", formData);

      localStorage.setItem("user_id", res.data.user.user_id);

      alert("Login Successful");
      // navigate("/dashboard");
      navigate("/setup");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Welcome Back 👋</h1>
        <p>Login to TEDGuideAI</p>

        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />

          <button type="submit">Login</button>
        </form>

        <p>
          New here? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;