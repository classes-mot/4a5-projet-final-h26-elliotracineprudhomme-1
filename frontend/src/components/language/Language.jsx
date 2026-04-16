import { useTranslation } from "react-i18next";

export default function langSwitcher() {
  const { i18n } = useTranslation();
  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <button onClick={() => { changeLang("fr"); }}>
        fr
      </button>
      <button onClick={() => { changeLang("en"); }}>
        en
      </button>
    </div>
  );
}
