import React, { Component } from 'react';
import Order from './Order';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

import httpClient from '../../httpClient'
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
class OrderList extends Component {
    
  constructor(props){
    super(props);
    this.state = {perPage: 10, page: 0, orders:[]}

    this.removeOrder = this.removeOrder.bind(this)
  }

  removeOrder(id){
    let ordersCopy = [...this.state.orders]; // make a separate copy of the array
    var index = ordersCopy.findIndex(o=>o._id === id)
    if (index !== -1) {
      ordersCopy.splice(index, 1);
      this.setState({orders: ordersCopy});
    }
  }

  getOrders(page=0, status=null){
      if(page < 0 || (page > this.state.page && this.state.orders.length < this.state.perPage)){
        toast.warn("No more pages that way");
        return
      }
      const getOrdsPromise = this.props
      .getToken()
      .then(token=>{
        return httpClient
        .authorized(token)
        .get("/api/orders", { params: { page, status } })
        .then(res=>{
          this.setState({
            // res.data.sort((o1,o2)=>o1.createdAt < o2.createdAt
            orders: res.data,
            page
          });
        })
        .catch(err => {
          console.log(err.response);
        })
      })
      toast.promise(
        getOrdsPromise,
        {pending: 'fetching orders...'}
      )    
  
  }

  handleStatusChange(val){
    this.getOrders(this.state.page, val)
  }

  componentDidMount(){
    this.getOrders();
  }

  render() {
      return (
        <div>
          <div className='status-selector-container'>
            <Form.Select onChange={(e)=>this.handleStatusChange(e.target.value)}className='status-selector' aria-label="Default select example">
              <option value="">status(all)</option>
              <option value="FAILED">FAILED</option>
              <option value="PAID">PAID</option>
              <option value="PENDING">PENDING</option>
            </Form.Select>
          </div>
          <div className="order-list">
              {this.state.orders.map((o) =>
                  <Order key={o._id} order={o} getToken={this.props.getToken} removeOrder={this.removeOrder}/>
                  )}
          </div>
          <div style={{textAlign:'center'}}>
            <BsFillArrowLeftCircleFill cursor={"pointer"} className='pagination-btn' onClick={()=>this.getOrders(this.state.page - 1)}/>
              {this.state.page}
            <BsFillArrowRightCircleFill cursor={"pointer"} className='pagination-btn' onClick={()=>this.getOrders(this.state.page + 1)}/>       
          </div>                    
        </div>
      );
  }
}

export default OrderList;
