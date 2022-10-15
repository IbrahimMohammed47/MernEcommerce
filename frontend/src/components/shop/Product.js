
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useCart } from 'react-use-cart';
const Product = ({product}) => {
  const {_id,name,description,imageUrl,price,stock} = product
  const { addItem, getItem } = useCart();
  const { isAuthenticated } = useAuth0();
  return (
    <div className="product">
      <div>
        <img className="product-img" src={imageUrl} alt="product" width="90%" />
      </div>
      <div>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <div>
        <div className="product-price-stock">
          <div className="product-price">
            {Number(price/100).toFixed(2)} EGP
          </div>
          <div className='product-stock'>{stock>0?<span>stock:{stock}</span>:<span style={{color:"red"}}>out of stock</span>}</div>
        </div>
        <div className="product-btn-parent">
          <Button onClick={() => {
            if(isAuthenticated){
              let purchase = getItem(_id);
              
              if(stock === 0 || (purchase && purchase.quantity >= stock)){
                toast.warn("Insufficient stock");                
              }
              else{
                toast.info("Added to cart");
                addItem({id:_id, img:imageUrl, ...product})  
              }
            }
            else{
              toast.error("Please login first")
            }
          }} className="product-btn">Add To Cart</Button>
        </div>
      </div>
    </div>
  );
}

export default Product;