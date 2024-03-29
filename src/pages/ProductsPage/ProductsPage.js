import "./ProductsPage.scss";
import axios from "axios";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import { useState, useEffect } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState(null);

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

  useEffect(() => {
    getProducts();
  }, []);

  if (!products) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="product-container">
        {products.map((product) => {
          return <ProductComponent key={product.id} product={product} />;
        })}
      </div>
    </>
  );
};

export default ProductsPage;
