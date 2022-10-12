import React, { Component } from 'react';
import Order from './Order';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

class OrderList extends Component {
  
  
  constructor(props){
    super(props);
    this.state = {page: 1}
  }
  
  getOrders(){
      const orders = [
        {
          "_id": "634314a328ea41016dda8352",
          "userId": "dev|1234567",
          "purchases": [
            {
              "qty": 1,
              "name": "juice",
              "currPrice": 3250,
              "currStock": 1,
              "product": "6341259f1f92b59e4110ad0e",
              "_id": "634314a328ea41016dda8353"
            },
            {
              "qty": 2,
              "name": "icecream",
              "currPrice": 1550,
              "currStock": 1,
              "product": "63412d610d8c0edcdf4d7a21",
              "_id": "634314a328ea41016dda8354"
            }
          ],
          "status": "PENDING",
          "totalPrice": 6350,
          "stripePaymentUrl": "https://checkout.stripe.com/c/pay/cs_test_b1hWcEPJD6hPRQWg3fNTJpfw9UL6U9oxlmJdu1kxpAXyhD076qi1hYrDYp#fidkdWxOYHwnPyd1blpxYHZxWlFqPHZgNGZ%2FMGNUaTVBUmp0S05tYkFkSTU1QkpXZn9sSEAnKSdjd2poVmB3c2B3Jz9xd3BgKSdpZHxqcHFRfHVgJz8naHBpcWxabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
          "createdAt": "2022-10-09T18:36:19.478Z",
          "updatedAt": "2022-10-09T18:36:54.063Z",
          "__v": 0
        },
        {
          "_id": "634314a328ea41016dda8389",
          "userId": "dev|1234567",
          "purchases": [
            {
              "qty": 2,
              "name": "juice",
              "currPrice": 3250,
              "currStock": 1,
              "product": "6341259f1f92b59e4110ad0e",
              "_id": "634314a328ea41016dda8353"
            },
            {
              "qty": 1,
              "name": "icecream",
              "currPrice": 1550,
              "currStock": 1,
              "product": "63412d610d8c0edcdf4d7a21",
              "_id": "634314a328ea41016dda8354"
            }
          ],
          "status": "PAID",
          "totalPrice": 7050,
          "stripePaymentUrl": "https://checkout.stripe.com/c/pay/cs_test_b1hWcEPJD6hPRQWg3fNTJpfw9UL6U9oxlmJdu1kxpAXyhD076qi1hYrDYp#fidkdWxOYHwnPyd1blpxYHZxWlFqPHZgNGZ%2FMGNUaTVBUmp0S05tYkFkSTU1QkpXZn9sSEAnKSdjd2poVmB3c2B3Jz9xd3BgKSdpZHxqcHFRfHVgJz8naHBpcWxabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
          "createdAt": "2022-10-09T18:36:19.478Z",
          "updatedAt": "2022-10-09T18:36:54.063Z",
          "__v": 0
        },
        {
          "_id": "63430b9befddd76829eedb95",
          "userId": "dev|1234567",
          "purchases": [
            {
              "qty": 1,
              "name": "juice",
              "currPrice": 3250,
              "currStock": 2,
              "product": "6341259f1f92b59e4110ad0e",
              "_id": "63430b9befddd76829eedb96"
            },
            {
              "qty": 1,
              "name": "icecream",
              "currPrice": 1550,
              "currStock": 2,
              "product": "63412d610d8c0edcdf4d7a21",
              "_id": "63430b9befddd76829eedb97"
            }
          ],
          "status": "FAILED",
          "totalPrice": 4800,
          "stripePaymentUrl": "https://checkout.stripe.com/c/pay/cs_test_b1D6NzKKhUkgylhAOGRQhii1QJZIdq9YzRTzNu3qw4AYFe5xEtfg04rC1a#fidkdWxOYHwnPyd1blpxYHZxWlFqPHZgNGZ%2FMGNUaTVBUmp0S05tYkFkSTU1QkpXZn9sSEAnKSdjd2poVmB3c2B3Jz9xd3BgKSdpZHxqcHFRfHVgJz8naHBpcWxabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
          "createdAt": "2022-10-09T17:57:47.468Z",
          "updatedAt": "2022-10-09T18:27:47.967Z",
          "__v": 0
        }
      ];

      return orders;

  }
  render() {
      let orders = this.getOrders();
      return (
        <div>
          <div className="order-list">
              {orders.map((p, i) =>
                  <Order key={i} order={p}/>
                  )}
          </div>
          <div style={{textAlign:'center'}}>
            <BsFillArrowLeftCircleFill className='pagination-btn' onClick={()=>{}}/>
              {this.state.page}
            <BsFillArrowRightCircleFill className='pagination-btn'onClick={()=>{}}/>       
          </div>                    
        </div>
      );
  }
}

export default OrderList;
