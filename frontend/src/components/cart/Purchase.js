
import React from 'react';
import { Button } from 'react-bootstrap';
import { useCart } from "react-use-cart";

const Purchase = ({product}) => {
    const {
        updateItemQuantity
      } = useCart();
  const {id, name, img, price, quantity} = product
  return (
    <div className="purchase">
      <div className="purchase-img">
          <img src={img} alt="purchase"/>
      </div>
      <div className="purchase-info">
        <h4 style={{display:"inline-block"}}>{quantity} x {name} ({Number(price * quantity).toFixed(2)} EGP)</h4>
        <div className='purchase-qty-control'>
            <Button size="sm" onClick={()=>updateItemQuantity(id, quantity + 1)} className="purchase-qty-btn">+</Button>
            <Button size="sm" onClick={()=>updateItemQuantity(id, quantity - 1)} className="purchase-qty-btn">-</Button>
        </div>
      </div>
    </div>
  );
}

export default Purchase;