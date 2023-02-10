import React from 'react';
import {Link} from 'react-router-dom';

const Product = ({product}) => {
  // const options = {
  //   value: product.ratings,
  //   readOnly: true,
  //   precision: 0.5,
  // };
  return (
    <div>
        <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt="product" />
        <p>{product.name}</p>
        <div>
            {/* resolve React rating dependencies*/}
            <p >256 Reviews</p>
            <span>{`₹${product.price}`}</span>
        </div>

        </Link>
    </div>
  )
}

export default Product