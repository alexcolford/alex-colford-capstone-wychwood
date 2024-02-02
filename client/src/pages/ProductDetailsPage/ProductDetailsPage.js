import "./ProductDetailsPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../../components/CommentSection/CommentSection";
import whiteHeart from "../../assets/icons/white-heart.svg";
import blackHeart from "../../assets/icons/black-heart.svg";

const ProductDetailsPage = ({ isLoggedIn, loggedInUser }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [isFavourited, setIsFavourited] = useState(false);

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

  const getFavourites = async (favouriteId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/profile/${loggedInUser}`,
        { data: { id: favouriteId } }
      );

      // console.log("Get Favourites Response", response.data);

      setIsFavourited(response.data);
    } catch (error) {
      console.log("Error getting favourites", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    getFavourites();
  }, []);

  if (!productDetails) {
    return <div>Loading</div>;
  }

  // console.log("GETfavourites", isFavourited);

  let newFavourite = {
    product_id: id,
    user_id: loggedInUser,
    is_favourited: true,
  };

  const handleFavouriting = async (event) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/profile/${loggedInUser}`,
        newFavourite
      );

      console.log("Favourite Response", response.data);
      setIsFavourited(response.data.is_favourited);
      getFavourites();
    } catch (error) {
      console.log("Error", error);
    }
  };

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
            {isLoggedIn && (
              <img
                className="details-container__image"
                src={isFavourited ? blackHeart : whiteHeart}
                alt="heart"
                onClick={handleFavouriting}
              />
            )}
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
