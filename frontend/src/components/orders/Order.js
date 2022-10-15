
import React from 'react';
import { Button, Row, Col, Badge } from 'react-bootstrap';
import httpClient from '../../httpClient'
import { toast } from 'react-toastify'; 

const Order = ({order, getToken, removeOrder}) => {
  const {_id, status, totalPrice, stripePaymentUrl, purchases, createdAt} = order
  
  const cancelOrder = (id) => {
    const orderPromise = getToken()
      .then(token=>{
        return httpClient
        .authorized(token)
        .delete(`/api/orders/${id}`)
        .then(()=>{
          removeOrder(id);
        })
      })
      toast.promise(
        orderPromise,
        {
          pending: 'Order is being deleted...',
          success: 'Order is successfully deleted',
          error: {
            render({data}){
              const msg = data.response? data.response.data.message : 'something went wrong'
              return `Order not deleted 🤯: ${msg}`
            }
          }
        }
      )
  }

  const expirationDuration = 30 * 60 * 1000 // 30 mins
  const deadline = Date.parse(createdAt) + expirationDuration
  const [time, setTime] = React.useState(deadline - Date.now());
  React.useEffect(() => {
    const interval = setInterval(() => setTime(deadline - Date.now()),1000 * 60);
    return () => clearInterval(interval);
  }, [deadline]);

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
          {purchases.map(p=><div key={p.product}>{p.qty} x {p.name}({(p.currPrice*p.qty)/100} EGP)</div>)}
        </Col>
        <Col className='abc' sm={{span: 4, offset: 4 }}>
          <h2>Total: {totalPrice/100} EGP</h2>
        </Col>
      </Row>
      <Row >
        {
          status==='PENDING'?
          <div>
            <a target="_blank" rel="noopener noreferrer" href={stripePaymentUrl}>
              <Button size="sm" variant='success' className='order-btn' >Pay now</Button>
            </a>
            <Button onClick={()=>cancelOrder(_id)} size="sm" variant='danger' className='order-btn'>Cancel</Button>
            <br/>
            <sub id="minute">{time > 0?Number(time / (60*1000)).toFixed(0) % 60:0}
               &nbsp;minutes until expiration
            </sub>
          </div>
          : <div/>
        }
          
      </Row>
    </div>
  );
}

export default Order;