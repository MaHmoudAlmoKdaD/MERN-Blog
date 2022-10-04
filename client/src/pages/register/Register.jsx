import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const submitFrom = async (e) => {
    e.preventDefault();
    if (user.password.length < 8) {
      setPasswordError(true);
      setUsernameError(false)
      setEmailError(false)
      return;
    }
    setPasswordError(false);
    axios
      .post("/auth/register", user)
      .then((response) => {
        navigate("/login");
        setUsernameError(false);
        setEmailError(false);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          setUsernameError(true);
          setEmailError(false);
        } else {
          setUsernameError(false);
          setEmailError(true);
        }
      });
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={submitFrom}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
        {usernameError && (
          <span className="error">
            Username Invalid, Choose another Username
          </span>
        )}
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        {emailError && (
          <span className="error">Email Invalid, Choose Another Email</span>
        )}
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        {passwordError && (
          <span className="error">
            Should be greater than 8 characters
          </span>
        )}
        <button className="registerButton">Register</button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
    </div>
  );
}
