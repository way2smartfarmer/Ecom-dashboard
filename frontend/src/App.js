
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

function App() {

  useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto","Droid Sans","Chilanka"]
      }
    })
  })
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products/' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/products/:keyword' element={<Products />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
