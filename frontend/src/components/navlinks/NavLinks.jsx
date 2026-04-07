import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/app-context.js";
import ADD from "../../assets/img/ADD.png";
import LOGIN from "../../assets/img/LOGIN.png";
import LOGOUT from "../../assets/img/LOGOUT.png";
import REGISTER from "../../assets/img/REGISTER.png";
import ALL from "../../assets/img/MUSIC.png";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  return (
    <ul className="">
      <li>
        <NavLink to="/">
          <img src={ALL} alt="link-to-main" />
        </NavLink>
      </li>
      {!auth.isLoggedIn && (
        <>
          <li>
            <NavLink to="/login">
              <img src={LOGIN} alt="link-to-login" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">
              <img src={REGISTER} alt="link-to-register" />
            </NavLink>
          </li>
        </>
      )}
      {auth.isLoggedIn && (
        <ul>
          <li>
            <NavLink to="/add">
              <img src={ADD} alt="link-to-add" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/songs" onClick={auth.logout}>
              <img src={LOGOUT} alt="link-to-logout" />
            </NavLink>
          </li>
        </ul>
      )}
    </ul>
  );
};

export default NavLinks;
