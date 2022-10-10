import React, { Component } from 'react';
import axios from 'axios';class Input extends Component {
  state = {
    name: '',
  };  
  
  addProduct = () => {
    const task = { name: this.state.name };    if (task.name && task.name.length > 0) {
      axios
        .post('/api/products', task)
        .then((res) => {
          if (res.data) {
            this.props.getProducts();
            this.setState({ name: '' });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('input field required');
    }
  };  
  
  handleChange = (e) => {
    this.setState({
        name: e.target.value,
    });
  };  
  
  render() {
    let { name } = this.state;
    return (
      <div>
        <input type="text" onChange={this.handleChange} value={name} />
        <button onClick={this.addProduct}>add product</button>
      </div>
    );
  }
}export default Input;