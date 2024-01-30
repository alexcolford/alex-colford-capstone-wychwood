import "./ProductsPage.scss";
import axios from "axios";
import ProductComponent from "../../components/ProductComponent/ProductCompnent";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products`
      );

      console.log("Response", response.data);

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
      <section>
        {products.map((product) => {
          return (
            <ProductComponent
              key={product.id}
              productId={product.id}
              name={product.name}
              size={product.size}
              price={product.price}
              description={product.description}
              ingredients={product.ingredients}
              instructions={product.instructions}
              image_path={product.image_path}
            />
          );
        })}
      </section>
    </>
  );
};

export default Products;
