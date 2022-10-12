
import React from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useCart } from 'react-use-cart';
const Product = ({product}) => {
  const {name,description,img,price,stock} = product
  const { addItem } = useCart();
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="product" width="90%" />
      </div>
      <div>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <div>
        <div className="product-price-stock">
          <div className="product-price">
            {Number(price).toFixed(2)} EGP
          </div>
          <div className='product-stock'>stock:{stock}</div>
        </div>
        <div className="product-btn-parent">
          <Button onClick={() => {toast.info(`Added to cart`);addItem({id:product._id,...product})}} className="product-btn">Add To Cart</Button>
        </div>
      </div>
    </div>
  );
}

export default Product;