
import './App.css';
import Header from './component/layout/Header/Header.js';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Home from './component/Home/Home.js';
import Footer from './component/layout/Footer/Footer';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js'
import LoginSignUp from './component/User/LoginSignUp';
import store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js'
import ProtectedRoute from './component/Route/ProtectedRoute';

function App() {
const {isAuthenticated,user} = useSelector(state => state.user)
  useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto","Droid Sans","Chilanka"]
      }
    });
    store.dispatch(loadUser())
  },[])
  return (
    <Router>
      <Header />
      {  <UserOptions user={user} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products/' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/account' element={<Profile />}/>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
