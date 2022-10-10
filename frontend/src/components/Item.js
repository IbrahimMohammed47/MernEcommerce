import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';
import ListProduct from './ProductList';
class Product extends Component {
  state = {
    products: [],
  };  
  
  componentDidMount() {
    this.getProducts();
  }  
  
  getProducts = () => {
    axios
      .get('/api/products')
      .then((res) => {
        if (res.data) {
          this.setState({
            products: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };  
  
  deleteProduct = (id) => {
    axios
      .delete(`/api/products/${id}`)
      .then((res) => {
        if (res.data) {
          this.getProducts();
        }
      })
      .catch((err) => console.log(err));
  };  
  
  render() {
    let { products } = this.state;    return (
      <div>
        <h1>My Product(s)</h1>
        <Input getProducts={this.getProducts} />
        <ListProduct products={products} deleteProduct={this.deleteProduct} />
      </div>
    );
  }
}export default Product;