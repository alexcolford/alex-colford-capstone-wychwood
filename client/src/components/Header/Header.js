import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.scss";
import logo from "../../assets/logo/logo.png";
import DropdownItem from "../DropdownItem/DropdownItem";

function Header({ isLoggedIn, handleLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to={"/"}>
          <img
            className="header-container__logo"
            src={logo}
            alt="wychwood-logo"
          />
        </Link>
      </div>
      <nav className="nav">
        <div className="nav-container">
          <ul className="nav-container__list">
            <div className="nav-container__menu">
              <li
                className="nav-container__list-item nav-container__list-item--mobile nav-container__menu-trigger"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                MENU
              </li>
              <div
                className={`nav-container__menu-dropdown ${
                  open ? "active" : "inactive"
                }`}
              >
                <ul>
                  <DropdownItem path={"/"} text={"HOME"} />
                  <DropdownItem path={"/products"} text={"PRODUCTS"} />
                  <DropdownItem path={"/elements"} text={"ELEMENTS"} />
                </ul>
              </div>
            </div>
            <Link to={"/"} className="nav-container__list-link">
              <li className="nav-container__list-item nav-container__list-item--tablet">
                HOME
              </li>
            </Link>
            <Link to={"/products"} className="nav-container__list-link">
              <li className="nav-container__list-item nav-container__list-item--tablet">
                PRODUCTS
              </li>
            </Link>
            <Link to={"/elements"} className="nav-container__list-link">
              <li className="nav-container__list-item nav-container__list-item--tablet">
                ELEMENTS
              </li>
            </Link>
          </ul>
        </div>
        <div className="nav-container">
          <ul className="nav-container__list">
            {isLoggedIn ? (
              <>
                <Link to={"/profile"} className="nav-container__list-link">
                  <li className="nav-container__list-item">PROFILE</li>
                </Link>
                <Link className="nav-container__list-link">
                  <li
                    className="nav-container__list-item nav-container__list-item--login"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/register"} className="nav-container__list-link">
                  <li className="nav-container__list-item">REGISTER</li>
                </Link>
                <Link to={"/login"} className="nav-container__list-link">
                  <li className="nav-container__list-item nav-container__list-item--login">
                    LOGIN
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
