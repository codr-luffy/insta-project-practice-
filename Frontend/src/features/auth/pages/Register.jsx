import "../styles/form.scss";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Register = () => {
  const { handleRegister, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    await handleRegister(username, email, password).then((res) => {
      console.log(res);
      navigate("/");
    });
  }
  if (loading) {
    return <h1>Register-Loading...</h1>;
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
