import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useCart } from "react-use-cart";
import Purchase from './Purchase';
import httpClient from '../../httpClient'
import { toast } from 'react-toastify'; 
const Cart = ({getToken}) => {
    const {
      isEmpty,
      totalUniqueItems,
      items,
      cartTotal,
      emptyCart
    } = useCart();
    const navigate = useNavigate();
    if (isEmpty) return <h2>Your cart is empty</h2>;
    
    const checkout = () =>{
      const purchases = items.map(item=>({
        product: item._id,
        name: item.name,
        currPrice: item.price,
        currStock: item.stock,
        qty: item.quantity,
      }))
      
      const orderPromise = getToken()
      .then(token=>{
        return httpClient
        .authorized(token)
        .post("/api/orders",{purchases},{
          'axios-retry': {
            retries: 0
          }
        })
        .then(()=>{
          emptyCart();
          navigate('/orders')
        })
      }) 
      toast.promise(
        orderPromise,
        {
          pending: 'Order is processing...',
          success: 'Order is successfully listed 👌',
          error: {
            render({data}){
              const msg = data.response? data.response.data.message : 'something went wrong'
              emptyCart();
              return `Order listing failed 🤯: ${msg}`
            }
          }
        }
      )    
      // .catch(err => {
      //   console.log(err.response);
      // })
    }

    return (
      <>
        <h1>Cart ({totalUniqueItems})</h1>
        {items.map((item) => (
            <Purchase product={item} key={item.id}/>
          ))}
        <h3>Total: {Number(cartTotal/100).toFixed(2)} EGP</h3>
        <Button onClick={()=>checkout()}variant='success' className='checkout-btn'>Checkout</Button>
        <Button onClick={()=>emptyCart()} variant='danger' className='checkout-btn'>Clear</Button>

      </>
    );
  }

export default Cart;

