import "./Header.scss";
import logo from "../../assets/logo/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <img
          className="header-container__logo"
          src={logo}
          alt="wychwood-logo"
        />
      </div>
      <nav className="nav">
        <div className="nav-container">
          <ul className="nav-container__list">
            <li className="nav-container__list-item nav-container__list-item--mobile">
              MENU
            </li>
            <li className="nav-container__list-item nav-container__list-item--tablet">
              HOME
            </li>
            <li className="nav-container__list-item nav-container__list-item--tablet">
              PRODUCTS
            </li>
            <li className="nav-container__list-item nav-container__list-item--tablet">
              ELEMENTS
            </li>
          </ul>
        </div>
        <div className="nav-container">
          <ul className="nav-container__list">
            <li className="nav-container__list-item">REGISTER</li>
            <li className="nav-container__list-item nav-container__list-item--login">
              LOGIN
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
