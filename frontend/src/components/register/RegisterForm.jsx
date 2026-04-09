import { useState, useContext } from "react";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/app-context.js";

const RegisterForm = () => {
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
      const reponse = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginValues),
      });
      console.log("enregistré!!!!");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="form-card">
        <h1>register</h1>
        <form onSubmit={submitHandler}>
          <div className="label-input">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="off"
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
              autoComplete="new-password"
              placeholder="password"
              onChange={(event) =>
                handleLoginInputChange("password", event.target.value)
              }
              value={loginValues.password}
            />
          </div>
          <div className="label-input">
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              autoComplete="new-password"
              placeholder="confirm password"
              onChange={(event) =>
                handleLoginInputChange("password", event.target.value)
              }
              value={loginValues.password}
            />
          </div>

          <div>
            <button>reset</button>
            <button type="submit">register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
