import instagramLogo from "../../assets/icons/instagram.svg";
import facebookLogo from "../../assets/icons/facebook.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img
          className="footer-container__icon"
          src={facebookLogo}
          alt="facebook-logo"
        />
        <img
          className="footer-container__icon"
          src={instagramLogo}
          alt="instagram-logo"
        />
      </div>
      <p className="footer__copyright">
        ©2023 Wychwood Naturals, All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
