
import React from 'react';
import { Button } from 'react-bootstrap';
import { useCart } from "react-use-cart";
import { toast } from 'react-toastify';

const Purchase = ({product}) => {
    const {
        updateItemQuantity
      } = useCart();
  const {id, name, img, price, quantity, stock} = product
  return (
    <div className="purchase">
      <div className='purchase-img-container'>
          <img className="purchase-img" src={img} alt="purchase"/>
      </div>
      <div className="purchase-info">
        <h4 style={{display:"inline-block"}}>{quantity} x {name} ({Number((price * quantity)/100).toFixed(2)} EGP)</h4>
        <div>Unit price: {price/100} EGP</div>
        <div className='purchase-qty-control'>
            <Button size="sm" onClick={()=>{updateItemQuantity(id, quantity - 1)}} className="purchase-qty-btn">-</Button>
            <Button size="sm" onClick={()=>{
              if(stock === 0 || quantity >= stock){
                toast.warn("Insufficient stock");                
              }
              else{
                updateItemQuantity(id, quantity + 1)
              }
            }} className="purchase-qty-btn">+</Button>
        </div>
      </div>
    </div>
  );
}

export default Purchase;