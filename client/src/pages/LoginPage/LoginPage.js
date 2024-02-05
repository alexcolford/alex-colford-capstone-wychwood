import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ onLoginStatusChange, onUserStatusChange }) => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        {
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );

      const token = response.data.token;
      const userId = response.data.id;

      sessionStorage.setItem("token", token);
      onLoginStatusChange(true);
      onUserStatusChange(userId);

      navigate(`/`);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <main className="login">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form__container">
          <h1 className="login-form__container-title">LOGIN TO YOUR ACCOUNT</h1>
          <input
            className="login-form__container-input"
            name="email"
            type="text"
            placeholder="EMAIL"
          ></input>
          <input
            className="login-form__container-input"
            name="password"
            type="password"
            placeholder="PASSWORD"
          ></input>
        </div>
        <button className="login-form__button">LOGIN</button>
      </form>
      <p className="login__note">
        Don't have an account?{" "}
        <Link className="login__note-link" to="/register">
          Register Here
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
