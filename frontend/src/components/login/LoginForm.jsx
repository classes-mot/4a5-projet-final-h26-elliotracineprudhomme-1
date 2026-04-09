import { useState, useContext } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/app-context.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });
  const handleLoginInputChange = (id, value) => {
    setLoginValues((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const reponse = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginValues),
      });
      auth.login(reponse.userId, reponse.token);
      console.log("connecté!!!!");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="form-card">
        <h1>login</h1>
        <form onSubmit={submitHandler}>
          <div className="label-input">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              placeholder="username"
              onChange={(event) =>
                handleLoginInputChange("username", event.target.value)
              }
              value={loginValues.username}
            />
          </div>
          <div className="label-input">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="password"
              onChange={(event) =>
                handleLoginInputChange("password", event.target.value)
              }
              value={loginValues.password}
            />
          </div>

          <div>
            <Link to="/register">
              <button>register</button>
            </Link>
            <button type="submit">login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
