import { Link } from "react-router-dom";
import "./ProductComponent.scss";

const ProductComponent = ({
  productId,
  name,
  size,
  price,
  image_path,
  description,
  ingredients,
  instructions,
}) => {
  return (
    <>
      <div className="product">
        <img className="product__image" src={image_path} alt={name} />
        <div className="product-details">
          <p className="product-details__name">{name}</p>
          <div className="product-details__section">
            <p className="product-details__size">{size}</p>
            <p className="product-details__price">${price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductComponent;
