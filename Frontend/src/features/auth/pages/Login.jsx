import "../styles/form.scss";
import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter Username"
          ></input>
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter Password"
          ></input>
          <button className="submit" type="submit">
            Login
          </button>
          <p>
            Already have an account?{" "}
            <Link className="toggle" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
