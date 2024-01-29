import { Link } from "react-router-dom";
import storyImage from "../../assets/images/photo-1.jpg";
import "./Story.scss";

const Story = () => {
  return (
    <>
      <div className="story-container">
        <h4 className="story-container__subtitle">ALL NATURAL</h4>
        <h2 className="story-container__title">Our Story</h2>
        <p className="story-container__paragraph">
          Wychwood Naturals came about through necessity and curiosity.
          Necessity because my overly sensitive skin was always a little too
          dramatic about store-bought products, and curiosity because I wanted
          to see if I could find a better option from natural sources.
        </p>
        <p className="story-container__paragraph">
          My goal is to use the plants I grow and forage, combined with raw
          materials from Canadian companies, to make skin care and home care
          products that I can feel good about using.
        </p>
        <p className="story-container__paragraph">
          I started making my own skin care products about a decade ago. The
          first was a dandelion and plantain salve. That has now evolved into
          the Wildcraft Healing Salve. The other was a coffee hand scrub. My
          hands and feet are always filthy thanks to gardening gloveless while
          wearing flip flops, so those two products helped me scrub away the
          dirt and repair some of the damage I inflicted upon myself.
        </p>
        <p className="story-container__paragraph">
          I started giving away some of my mixes and the feedback I was getting
          from friends and family made me think that I should take things a step
          further. After all, if the products work for me, work for people I
          know, why not offer them to others who may have the same desire for
          stripped down, natural products that make you feel great?
        </p>
        <p className="story-container__paragraph">And so, here we are.</p>
        <p className="story-container__paragraph">
          Hopefully you will enjoy using the various offerings as much as I have
          enjoyed making them.
        </p>
        <p className="story-container__paragraph">Melanie</p>
      </div>
      {/* <div className="hero-container__image-container">
        <img
          className="hero-container__image"
          src={heroImage}
          alt="products-on-shelf"
        />
      </div> */}
    </>
  );
};

export default Story;
