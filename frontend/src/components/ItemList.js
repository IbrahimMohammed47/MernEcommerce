import React from 'react';

const ProductList = ({ products, deleteProduct }) => {
    return (
      <ul>
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <li key={product._id} onClick={() => deleteProduct(product._id)}>
                {product.name}
              </li>
            );
          })
        ) : (
          <li>No product(s) left</li>
        )}
      </ul>
    );
  };export default ProductList;