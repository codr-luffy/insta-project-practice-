import "../styles/form.scss";
import { Link } from "react-router";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
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
        <h1>Register</h1>
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
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Enter Email"
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
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link className="toggle" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
