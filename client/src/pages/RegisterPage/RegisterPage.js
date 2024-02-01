import "./RegisterPage.scss";
import SubmitSuccess from "../../components/SubmitSuccess/SubmitSuccess";
import error from "../../assets/icons/error-24px.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [response, setResponse] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

  useEffect(() => {
    if (isSuccessfullySubmitted) {
      const timeout = setTimeout(() => {
        setIsSuccessfullySubmitted(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isSuccessfullySubmitted]);

  const handleInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const newUser = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    confirm_password: userData.confirm_password,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitted(true);

    if (
      userData.name === "" ||
      userData.email === "" ||
      userData.password === "" ||
      userData.confirm_password === ""
    ) {
      return;
    }

    if (userData.password !== userData.confirm_password) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        newUser
      );

      console.log("Response", response.data);
      setResponse(response.data);
      setIsSuccessfullySubmitted(true);
      event.target.reset();
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
          <h1 className="register-form__container-title">
            CREATE YOUR ACCOUNT
          </h1>
          <input
            className={`register-form__container-input ${
              isSubmitted && userData.name === ""
                ? "register-form__container-input--error"
                : ""
            }`}
            name="name"
            type="text"
            placeholder="FIRST NAME AND LAST NAME"
            onChange={handleInputChange}
          ></input>
          {isSubmitted && userData.name === "" ? errorMessage : ""}
          <input
            className={`register-form__container-input ${
              isSubmitted && userData.email === ""
                ? "register-form__container-input--error"
                : ""
            }`}
            name="email"
            type="text"
            placeholder="EMAIL"
            onChange={handleInputChange}
          ></input>
          {isSubmitted && userData.email === "" ? errorMessage : ""}
          <input
            className={`register-form__container-input ${
              isSubmitted && userData.password === ""
                ? "register-form__container-input--error"
                : ""
            }`}
            name="password"
            type="password"
            placeholder="PASSWORD"
            onChange={handleInputChange}
          ></input>
          {isSubmitted && userData.password === "" ? errorMessage : ""}
          <input
            className={`register-form__container-input ${
              (isSubmitted && userData.confirm_password === "") ||
              (isSubmitted && userData.password !== userData.confirm_password)
                ? "register-form__container-input--error"
                : ""
            }`}
            name="confirm_password"
            type="password"
            placeholder="CONFIRM PASSWORD"
            onChange={handleInputChange}
          ></input>
          {isSubmitted && userData.confirm_password === "" ? errorMessage : ""}
          {isSubmitted &&
            userData.password !== userData.confirm_password &&
            passwordMatch}
        </div>
        <button className="register-form__button">CREATE ACCOUNT</button>
        <SubmitSuccess trigger={isSuccessfullySubmitted} />
      </form>
      <p className="register__note">
        Have an account?{" "}
        <Link className="register__note-link" to="/login">
          Log in
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
