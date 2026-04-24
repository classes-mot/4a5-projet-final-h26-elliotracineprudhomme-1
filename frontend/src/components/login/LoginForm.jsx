import { useContext } from "react";
import "./Form.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/app-context.js";
import { useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (id, value) => {
    setLoginValues((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const reponse = await sendRequest(
        import.meta.env.VITE_BACKEND_URL + "users/login",
        "POST",
        JSON.stringify(loginValues),
        {
          "Content-Type": "application/json",
        },
      );
      auth.login(reponse.userId, reponse.token);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="form-card">
        <h1>{t("login.title")}</h1>
        <form onSubmit={submitHandler}>
          <div className="label-input">
            <label htmlFor="username">{t("login.username")}</label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              placeholder={t("login.username-placeholder")}
              onChange={(event) =>
                handleLoginChange("username", event.target.value)
              }
              value={loginValues.username}
            />
          </div>
          <div className="label-input">
            <label htmlFor="password">{t("login.password")}</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder={t("login.password-placeholder")}
              onChange={(event) =>
                handleLoginChange("password", event.target.value)
              }
              value={loginValues.password}
            />
          </div>

          <div>
            <Link to="/register">
              <button>{t("login.register")}</button>
            </Link>
            <button type="submit">{t("login.login")}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
