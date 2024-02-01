import "./ProductDetailsPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../../components/CommentSection/CommentSection";

const ProductDetailsPage = ({ isLoggedIn, loggedInUser }) => {
  const [productDetails, setProductDetails] = useState(null);

  const id = useParams().id;

  // console.log("isLoggedIn", isLoggedIn);

  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/${id}`
      );

      // console.log("Response", response.data);

      setProductDetails({
        name: response.data[0].name,
        size: response.data[0].size,
        price: response.data[0].price,
        description: response.data[0].description,
        instructions: response.data[0].instructions,
        ingredients: response.data[0].ingredients,
        image_path: response.data[0].image_path,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!productDetails) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="details">
        <img
          className="details__image"
          src={productDetails.image_path}
          alt={productDetails.name}
        />
        <div className="details-container">
          <h1 className="details-container__name">{productDetails.name}</h1>
          <div className="details-container__section">
            <p className="details-container__size">{productDetails.size}</p>
            <p className="details-container__price">${productDetails.price}</p>
          </div>
          <div className="details-container__wrapper">
            <p className="details-container__title">DESCRIPTION</p>
            <p className="details-container__description">
              {productDetails.description}
            </p>
          </div>
          <div className="details-container__wrapper">
            <p className="details-container__title">INSTRUCTIONS</p>
            <p className="details-container__instructions">
              {productDetails.instructions}
            </p>
          </div>
          <div className="details-container__wrapper">
            <p className="details-container__title">INGREDIENTS</p>
            <p className="details-container__ingredients">
              {productDetails.ingredients}
            </p>
          </div>
        </div>
        <Link to={"/products"} className="details-container__button-container">
          <button className="details-container__button">
            Return to Products
          </button>
        </Link>
      </div>
      <div>
        <CommentSection isLoggedIn={isLoggedIn} loggedInUser={loggedInUser} />
      </div>
    </>
  );
};

export default ProductDetailsPage;
