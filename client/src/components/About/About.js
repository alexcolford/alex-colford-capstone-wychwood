import { Link } from "react-router-dom";
import aboutImage from "../../assets/images/photo-6.jpg";
import "./About.scss";

const About = () => {
  return (
    <>
      <div className="about__image-container">
        <div className="about__image-overlay"></div>
        <img
          className="about__image"
          src={aboutImage}
          alt="jar-of-herbs-in-oil"
        />
      </div>
      <div className="about-container">
        <h4 className="about-container__subtitle">NATURE SHINES THROUGH.</h4>
        <h2 className="about-container__title">100% Natural</h2>
        <Link to={"/elements"} className="about-container__button-container">
          <button className="about-container__button">Our Elements</button>
        </Link>
      </div>
    </>
  );
};

export default About;
