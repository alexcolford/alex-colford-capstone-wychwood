import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import ElementsPage from "./pages/ElementsPage/ElementsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [usersList, setUsersList] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (newStatus) => {
    setIsLoggedIn(newStatus);
  };

  const handleUser = (newStatus) => {
    setLoggedInUser(newStatus);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setLoggedInUser(null);
    setIsLoggedIn(false);
    setFailedAuth(true);
  };

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const authorizeUser = async () => {
      try {
        if (token) {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/users/current`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUsers(response.data);
          setIsLoggedIn(true);
          setLoggedInUser(response.data.id);

          const usersRes = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/users`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUsersList(usersRes.data);
        } else {
          setFailedAuth(true);
        }
      } catch (error) {
        console.log("Error", error);
        setFailedAuth(true);
      }
    };

    authorizeUser();
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          loggedInUser={loggedInUser}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/products/:id"
            element={
              <ProductDetailsPage
                isLoggedIn={isLoggedIn}
                loggedInUser={loggedInUser}
              />
            }
          />
          <Route path="/elements" element={<ElementsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginStatusChange={handleLogin}
                onUserStatusChange={handleUser}
              />
            }
          />
          <Route
            path="/users/profile/:id"
            element={
              loggedInUser ? <ProfilePage loggedInUser={loggedInUser} /> : null
            }
          />
          <Route
            path="/users/profile/:id/edit"
            element={
              loggedInUser ? (
                <EditProfilePage loggedInUser={loggedInUser} />
              ) : null
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
