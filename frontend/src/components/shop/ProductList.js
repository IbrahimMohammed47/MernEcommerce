import React, { Component } from 'react';
import Product from './Product';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

import httpClient from '../../httpClient'
import { toast } from 'react-toastify';

class ProductList extends Component {

    constructor(props){
        super(props);
        this.state = {perPage: 20,page: 0, products:[]}
      }
      
      getProducts(page=0){
        if(page < 0 || (page > this.state.page && this.state.products.length < this.state.perPage)){
          toast.warn("No more pages that way");
          return
        }
        const getProdsProm = httpClient
        .get("/api/products", { params: { page } })
        .then(res=>{
          this.setState({
            products: res.data,
            page
          });
        })
        .catch(err => {
          console.log(err);
        })

        toast.promise(
          getProdsProm,
          {pending: 'fetching products...'}
        )    
  

      }
    
      componentDidMount(){
        this.getProducts(0);
      }
    render() {
        return (
            <div>
                <div className="product-list">
                    {this.state.products.map((p) =>
                        <Product key={p._id} product={p}/>
                    )}
                </div>
                <div style={{textAlign:'center'}}>
                    <BsFillArrowLeftCircleFill cursor={"pointer"} onClick={()=>this.getProducts(this.state.page - 1)} className='pagination-btn'/>
                        {this.state.page + 1}
                    <BsFillArrowRightCircleFill cursor={"pointer"} onClick={()=>this.getProducts(this.state.page + 1)} className='pagination-btn'/>       
                </div>
            </div>
        );
    }
}

export default ProductList;
