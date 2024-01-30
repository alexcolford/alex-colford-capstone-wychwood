import { Link, useParams } from "react-router-dom";
import "./ProductComponent.scss";

const ProductComponent = ({ product }) => {
  return (
    <>
      <Link className="product__link" to={`/products/${product.id}`}>
        <div className="product">
          <img
            className="product__image"
            src={product.image_path}
            alt={product.name}
          />
          <div className="product-details">
            <p className="product-details__name">{product.name}</p>
            <div className="product-details__section">
              <p className="product-details__size">{product.size}</p>
              <p className="product-details__price">${product.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductComponent;
