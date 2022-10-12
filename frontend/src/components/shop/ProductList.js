import React, { Component } from 'react';
import Product from './Product';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

class ProductList extends Component {

    constructor(props){
        super(props);
        this.state = {page: 1}
    }
    getProducts(){
        const products = [
            {
                "_id": "1",
                "name": "Summer",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
                "img": "https://ui-avatars.com/api/?name=Place+Holder",
                "price": 177.32,
                "stock": 20
            },
            {
                "_id": "2",
                "name": "Autumn",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
                "img": "https://ui-avatars.com/api/?name=Place+Holder",
                "price": 54.32,
                "stock": 7
            },
            {
                "_id": "3",
                "name": "Spring",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
                "img": "https://ui-avatars.com/api/?name=Place+Holder",
                "price": 67.32,
                "stock": 4
            }
        ];

        return products;

    }
    render() {
        let products = this.getProducts();
        return (
            <div>
                <div className="product-list">
                    {products.map((p) =>
                        <Product key={p._id} product={p}/>
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

export default ProductList;
