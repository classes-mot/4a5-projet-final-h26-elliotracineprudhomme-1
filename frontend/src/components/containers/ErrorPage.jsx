import Header from "../header/Header";
import "./ErrorPage.css"
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
    const { t } = useTranslation();
  return (
    <>
      <Header />
      <main>
        <div className="error-card">
          <h1>{t("error.title")}</h1>
          <p>{t("error.msg")}</p>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
