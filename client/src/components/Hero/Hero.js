import { Link } from "react-router-dom";
import heroImage from "../../assets/images/photo-1.jpg";
import "./Hero.scss";

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <h4 className="hero-container__subtitle">MADE BY NATURE.</h4>
        <h2 className="hero-container__title">Crafted for you.</h2>
        <Link to={"/products"} className="hero-container__button-container">
          <button className="hero-container__button">Our Products</button>
        </Link>
      </div>
      <div className="hero-container__image-container">
        <div className="hero-container__image-overlay"></div>
        <img
          className="hero-container__image"
          src={heroImage}
          alt="products-on-shelf"
        />
      </div>
    </>
  );
};

export default Hero;
