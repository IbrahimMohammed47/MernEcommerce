
import React from 'react';
import { Button, Row, Col, Badge } from 'react-bootstrap';

const Order = ({order}) => {
  const {_id, status, totalPrice, stripePaymentUrl, purchases, createdAt} = order
  return (
    <div className="order container">
      <Row>
          <h4 style={{marginBottom:"0px"}}>Order #{_id} <Badge bg={
            status==='PENDING'?'primary':
            status==='PAID'?'success': 'dark'
          }>{status}</Badge></h4>
          <sub style={{marginBottom:"20px"}}>{(new Date(createdAt)).toUTCString()}</sub>
      </Row>
      <Row>
        <Col sm={4}>
          {purchases.map(p=><div key={p.product}>{p.qty} x {p.name}({(p.currPrice*p.qty)/1000} EGP)</div>)}
        </Col>
        <Col className='abc' sm={{span: 4, offset: 4 }}>
          <h2>Total: {totalPrice/1000} EGP</h2>
        </Col>
      </Row>
      <Row >
        {
          status==='PENDING'?
          <div>
            <a target="_blank" rel="noopener noreferrer" href={stripePaymentUrl}>
              <Button size="sm" variant='success' className='order-btn' >Checkout</Button>
            </a>
            <Button size="sm" variant='danger' className='order-btn'>Cancel</Button>
          </div>
          : <div/>
        }
          
      </Row>
    </div>
  );
}

export default Order;