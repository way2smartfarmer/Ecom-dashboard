import React, { Fragment } from 'react';
import './Home.css';
import MetaData from '../layout/MetaData';

const Home = () => {
  return (
    <Fragment>
        <MetaData title="ECOMMERCE "/>
        <div  className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href='#container'>
                <button>
                    Scroll 
                </button>
            </a>
        </div>
    </Fragment>
  )
}

export default Home