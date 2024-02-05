import "./ProfilePage.scss";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ProfilePage = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [favourites, setFavourites] = useState(null);
  const [users, setUsers] = useState(null);

  console.log("USERS", users);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products`
      );

      setProducts(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getFavourites = async (loggedInUser) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/favourites`
      );

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

      setUsers(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

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

  const currentUser = users.find((user) => loggedInUser === user.id);

  const filteredProducts = products
    ? products.filter((product) =>
        favourites.some(
          (favourite) =>
            favourite.user_id === loggedInUser &&
            favourite.product_id === product.id
        )
      )
    : [];

  const onDeleteButtonClicked = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/users/profile/${loggedInUser}`
      );

      sessionStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
        <Link
          to={`/users/profile/${loggedInUser}/edit`}
          loggedInUser={loggedInUser}
        >
          <button className="profile-container__button">EDIT PROFILE</button>
        </Link>
        <button
          className="profile-container__button"
          onClick={onDeleteButtonClicked}
        >
          DELETE PROFILE
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
