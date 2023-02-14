import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const product = {
  name: "Product 1",
  images: [
    {
      url: "https://e7.pngegg.com/pngimages/233/436/png-clipart-logo-agriculture-computer-icons-agriculture-miscellaneous-leaf-thumbnail.png",
    },
  ],
  price: "$300",
  _id: "akash",
};
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecommerce Page" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>Find Amazing Product Below</h1>
            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
      ;
    </Fragment>
  );
};

export default Home;
