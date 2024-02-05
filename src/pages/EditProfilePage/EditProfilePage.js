import "./EditProfilePage.scss";
import SaveSuccess from "../../components/SaveSuccess/SaveSuccess";
import error from "../../assets/icons/error-24px.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <main className="edit-profile">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="edit-profiler-form__container">
          <h1 className="edit-profile-form__container-title">EDIT PROFILE</h1>
          <input
            className={`edit-profile-form__container-input ${
              isSubmitted && editUserData.name === ""
                ? "edit-profile-form__container-input--error"
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
            className={`edit-profile-form__container-input ${
              isSubmitted && editUserData.email === ""
                ? "edit-profile-form__container-input--error"
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
        <button className="edit-profile-form__button">SAVE CHANGES</button>
        <SaveSuccess trigger={isSuccessfullySubmitted} />
      </form>
    </main>
  );
};

export default EditProfilePage;
