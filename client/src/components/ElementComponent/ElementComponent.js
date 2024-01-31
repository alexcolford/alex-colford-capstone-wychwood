import "./ElementComponent.scss";

const ElementComponent = ({ element }) => {
  return (
    <>
      <div className="element">
        <div className="element-details">
          <p className="element-details__name">{element.name}</p>
          <p className="element-details__description">{element.description}</p>
        </div>
      </div>
    </>
  );
};

export default ElementComponent;
