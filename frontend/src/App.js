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

  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }

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
      {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute path="/process/payment" element={<Payment />} />
        </Elements>
      )} */}
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

        <Route path="/orders/:id" element={<OrderDetails />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
              <UpdateProfile />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/process/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          isAdmin={true}
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          isAdmin={true}
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          isAdmin={true}
          path="/admin/product"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          isAdmin={true}
          path="/admin/product/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          isAdmin={true}
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <OrderList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          isAdmin={true}
          path="/admin/order/:id"
          element={
            <ProtectedRoute>
              <ProcessOrder />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          isAdmin={true}
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          isAdmin={true}
          path="/admin/user/:id"
          element={
            <ProtectedRoute>
              <UpdateUser />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          isAdmin={true}
          path="/admin/reviews"
          element={
            <ProtectedRoute>
              <ProductReviews />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
