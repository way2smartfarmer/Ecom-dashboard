import "./App.css";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home.js";
import Footer from "./component/layout/Footer/Footer";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/newProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    // getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignUp />} />

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/process/payment" element={<Payment />} />
          </Elements>
        )}

        <Route path="/orders/:id" element={<OrderDetails />} />

        {/* Add Routes to perticualar order/id and ortder/confim */}

        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />

          <Route path="/me/update" element={<UpdateProfile />} />

          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />

          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/process/payment" element={<Payment />} />

          <Route path="/orders" element={<MyOrders />} />
          <Route
            isAdmin={true}
            path="/admin/dashboard"
            element={<Dashboard />}
          />

          <Route
            isAdmin={true}
            path="/admin/products"
            element={<ProductList />}
          />

          <Route
            isAdmin={true}
            path="/admin/product"
            element={<NewProduct />}
          />

          <Route
            isAdmin={true}
            path="/admin/product/:id"
            element={<UpdateProduct />}
          />

          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
