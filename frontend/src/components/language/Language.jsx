import { useTranslation } from "react-i18next";

const Language = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <button className="lang-btn" onClick={() => { changeLanguage("fr"); }}>
        fr
      </button>
      <button className="lang-btn" onClick={() => { changeLanguage("en"); }}>
        en
      </button>
    </div>
  );
}
export default Language;