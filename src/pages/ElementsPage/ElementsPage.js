import "./ElementsPage.scss";
import axios from "axios";
import ElementComponent from "../../components/ElementComponent/ElementComponent";
import { useState, useEffect } from "react";
import headingImage from "../../assets/images/elements-photo-1.jpg";

const ElementsPage = () => {
  const [elements, setElements] = useState(null);

  const getElements = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/elements`
      );

      setElements(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getElements();
  }, []);

  if (!elements) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="elements-heading">
        <div className="elements-heading__container">
          <h3 className="elements-heading__subtitle">OUR INGREDIENTS</h3>
          <h1 className="elements-heading__title">
            What makes our products special?
          </h1>
          <p className="elements-heading__paragraph">
            Wychwood ingredients come from natural sources like homegrown herbs
            and hand picked botanicals, then blended with all natural Canadian
            sourced oils, butters, and waxes.
          </p>
        </div>
        <img
          className="elements-heading__image"
          src={headingImage}
          alt="yellow-botanical"
        />
      </div>
      <div className="element-container">
        <h3 className="element-container__title">THE CARRIER OILS</h3>
        {elements.map((element) => {
          return <ElementComponent key={element.id} element={element} />;
        })}
      </div>
    </>
  );
};

export default ElementsPage;
