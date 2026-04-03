import "./Header.css";
import { Link } from "react-router-dom";
import NavLinks from "../navlinks/NavLinks";

const Header = () => {
  let titre = "music.com";
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
