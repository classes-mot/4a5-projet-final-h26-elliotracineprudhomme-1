import "./Header.css";
import { Link } from "react-router-dom";
import NavLinks from "../navlinks/NavLinks";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  let titre = t("title");
  return (
    <header className="tp-header">
      <h1 className="tp-header-title">
        <Link to="/">{titre}</Link>
      </h1>
      <nav className="tp-header-nav">
        <NavLinks />
      </nav>
    </header>
  );
};

export default Header;
