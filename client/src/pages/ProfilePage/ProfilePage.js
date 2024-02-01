import "./ProfilePage.scss";
import ProductComponent from "../../components/ProductComponent/ProductCompnent";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <main className="profile">
      <div>
        <p>Welcome, </p>
      </div>
      <div>
        <h2>FAVOURITE PRODUCTS</h2>
        <p>map over favourites list and render Product Component</p>
      </div>
      <div>
        <button>EDIT PROFILE</button>
        <button>DELETE PROFILE</button>
      </div>
    </main>
  );
};

export default ProfilePage;
