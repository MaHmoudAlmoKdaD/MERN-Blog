import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const username = useRef();
  const email = useRef();
  const password = useRef();
  console.log(user);
  const submitFrom = async (e) => {
    e.preventDefault();
    setUser({
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    });
    // await axios({
    //   method: "POST",
    //   url: "/auth/register",
    //   data: user,
    // })
    // await axios
    //   .post("/auth/register", user)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log("first", err));
    const res = await axios.post('/auth/register',user)
    console.log(res)
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
          ref={username}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
          ref={email}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          ref={password}
        />
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
