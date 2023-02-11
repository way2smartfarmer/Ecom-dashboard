import React, { Fragment,useEffect } from 'react';
import './Home.css';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import {clearErrors, getProduct} from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../layout/Loader/Loader';
import {useAlert} from 'react-alert'
import ProductDetails from '../Product/ProductDetails';


const product = {
    name:"Product 1",
    images: [{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price: "$300",
    _id:"akash"
}
const Home = () => {
  const alert = useAlert();
  const dispatch  = useDispatch();
  const {loading,error,products,productsCount} = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    // if(error) {
    //   alert.error(error);
    //   dispatch(clearErrors())
    // }

   dispatch(getProduct());
  }, [dispatch,])
  
  return (
    <Fragment>
      {loading ? <Loader />: (
        <Fragment>
        <MetaData title="Ecommerce Page"/>
         <div className='banner'>
             <p>Welcome to Ecommerce</p>
             <h1>Find Ammazing Product Below</h1>
             <a href='#container'>
              <button>Scroll</button>
             </a>
         </div>
         <h2 className='homeHeading'>Featured Products</h2>
         <div className='container' id='container' >
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          {products && products.map(product => (
            <ProductCard product={product} />
          ))}
         </div>
         
      </Fragment>
      )};
    </Fragment>
  )
}

export default Home