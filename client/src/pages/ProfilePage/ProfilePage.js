import "./ProfilePage.scss";
import ProductComponent from "../../components/ProductComponent/ProductCompnent";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = ({ loggedInUser }) => {
  const [products, setProducts] = useState(null);
  const [favourites, setFavourites] = useState(null);
  const [users, setUsers] = useState(null);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products`
      );

      console.log("Products Response", response.data);

      setProducts(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getFavourites = async (loggedInUser) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/profile/${loggedInUser}`
      );

      console.log("Favourites Response", response.data);

      setFavourites(response.data);
    } catch (error) {
      console.log("Error getting favourites", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users`
      );

      console.log("User Response", response.data);

      setUsers(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // console.log("Logged In User", loggedInUser);

  useEffect(() => {
    getProducts();
    getUsers();
  }, []);

  useEffect(() => {
    getFavourites(loggedInUser);
  }, [loggedInUser]);

  if (!products || !users || !favourites) {
    return <div>Loading</div>;
  }

  const filteredProducts = products
    ? products.filter((product) =>
        favourites
          ? favourites.some((fav) => fav.product_id === product.id)
          : false
      )
    : [];

  const currentUser = users.find((user) => loggedInUser === user.id);

  console.log("Current User", currentUser);

  return (
    <main className="profile">
      <div className="profile-heading">
        <p className="profile-heading__message">
          Welcome,&nbsp;&nbsp;{currentUser.name}
        </p>
      </div>
      <div className="profile-favourites">
        <h2 className="profile-favourites__title">FAVOURITE PRODUCTS</h2>
        <div className="profile-favourites__list">
          {filteredProducts.map((product) => (
            <ProductComponent key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="profile-container">
        <button className="profile-container__button">EDIT PROFILE</button>
        <button className="profile-container__button">DELETE PROFILE</button>
      </div>
    </main>
  );
};

export default ProfilePage;
