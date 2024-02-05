import "./EditProfilePage.scss";
import SaveSuccess from "../../components/SaveSuccess/SaveSuccess";
import error from "../../assets/icons/error-24px.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfilePage = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
  });
  const [response, setResponse] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  //   const [users, setUsers] = useState(null);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users`
      );

      const allUsers = response.data;

      const currentUser = allUsers.find((user) => loggedInUser === user.id);

      setEditUserData({
        name: currentUser.name,
        email: currentUser.email,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (isSuccessfullySubmitted) {
      const timeout = setTimeout(() => {
        setIsSuccessfullySubmitted(false);
        navigate(`/users/profile/${loggedInUser}`);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isSuccessfullySubmitted]);

  if (!editUserData) {
    return <p>Loading...</p>;
  }

  const handleInputChange = (event) => {
    setEditUserData({
      ...editUserData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitted(true);
    console.log("LOGGED IN USER", loggedInUser);

    if (editUserData.name === "" || editUserData.email === "") {
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/${loggedInUser}/edit`,
        {
          name: editUserData.name,
          email: editUserData.email,
        }
      );

      console.log("Response", response.data);
      setResponse(response.data);
      setIsSuccessfullySubmitted(true);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const errorMessage = (
    <span className="register-form__error">
      <img className="register-form__error-icon" src={error} alt="error" />
      This field is required
    </span>
  );

  const passwordMatch = (
    <span className="register-form__error">
      <img className="register-form__error-icon" src={error} alt="error" />
      Your passwords don't match!
    </span>
  );

  return (
    <main className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form__container">
          <h1 className="register-form__container-title">EDIT PROFILE</h1>
          <input
            className={`register-form__container-input ${
              isSubmitted && editUserData.name === ""
                ? "register-form__container-input--error"
                : ""
            }`}
            name="name"
            type="text"
            placeholder="FIRST NAME AND LAST NAME"
            value={editUserData.name}
            onChange={handleInputChange}
          ></input>
          {isSubmitted && editUserData.name === "" ? errorMessage : ""}
          <input
            className={`register-form__container-input ${
              isSubmitted && editUserData.email === ""
                ? "register-form__container-input--error"
                : ""
            }`}
            name="email"
            type="text"
            placeholder="EMAIL"
            value={editUserData.email}
            onChange={handleInputChange}
          ></input>
          {isSubmitted && editUserData.email === "" ? errorMessage : ""}
        </div>
        <button className="register-form__button">SAVE CHANGES</button>
        <SaveSuccess trigger={isSuccessfullySubmitted} />
      </form>
    </main>
  );
};

export default EditProfilePage;
