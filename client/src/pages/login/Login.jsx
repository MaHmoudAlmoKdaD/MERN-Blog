import "./login.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import { Context } from "./../../context/Context";
import axios from "axios";
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching, error } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    axios
      .post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      .then((response) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAILURE",
        });
      });
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username"
          required
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password"
          required
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}
