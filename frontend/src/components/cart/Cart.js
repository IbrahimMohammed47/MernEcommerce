import React from 'react';
import { Button } from 'react-bootstrap';
import { useCart } from "react-use-cart";
import Purchase from './Purchase';

const Cart = () => {
    const {
      isEmpty,
      totalUniqueItems,
      items,
      cartTotal,
      emptyCart
    //   updateItemQuantity,
    //   removeItem,
    } = useCart();
    if (isEmpty) return <h2>Your cart is empty</h2>;
  
    return (
      <>
        <h1>Cart ({totalUniqueItems})</h1>
        {items.map((item) => (
            <Purchase product={item} key={item.id}/>
          ))}
        <h3>Total: {Number(cartTotal).toFixed(2)} EGP</h3>
        <Button variant='success' className='checkout-btn'>Checkout</Button>
        <Button onClick={()=>emptyCart()} variant='danger' className='checkout-btn'>Clear</Button>

      </>
    );
  }

export default Cart;

