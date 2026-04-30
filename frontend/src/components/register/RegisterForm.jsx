import { useState, useContext } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/app-context.js";
import { useTranslation } from "react-i18next";
import Loader from "../containers/LoadingCard.jsx";

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const response = await fetch(
        (import.meta.env.VITE_BACKEND_URL || "http//localhost:3000/api/") +
          "users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginValues),
        },
      );
      if (!response) {
        console.log("il y a une erreur avec l'enregistrement");
      }
      setIsLoading(false);
      console.log("enregistré!!!!");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="spinner"> {isLoading && <Loader />}</div>
      <div className="form-card">
        <h1>{t("register.title")}</h1>
        <form onSubmit={submitHandler}>
          <div className="label-input">
            <label htmlFor="username">{t("register.username")}</label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="off"
              placeholder={t("register.username-placeholder")}
              onChange={(event) =>
                handleLoginInputChange("username", event.target.value)
              }
              value={loginValues.username}
            />
          </div>
          <div className="label-input">
            <label htmlFor="password">{t("register.password")}</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder={t("register.password-placeholder")}
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
              placeholder={t("register.confirm")}
              onChange={(event) =>
                handleLoginInputChange("password", event.target.value)
              }
              value={loginValues.password}
            />
          </div>

          <div>
            <button>{t("register.reset")}</button>
            <button type="submit">{t("register.register")}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
