const Product = require('./model.js');
const service = {};

service.createProduct = (product) => {
    return Product.create(
        product
    );
}

service.updateProduct = (filters, productUpdate, session=null) => {
    return Product.findOneAndUpdate(
        filters,
        productUpdate,
        { new: true, session} 
      );
}

service.getProducts = (filters = {}) => {
    return Product.find(filters);
}


service.deleteProduct = (productId) => {
    return  Product.findByIdAndDelete(
        productId
      );
}

module.exports = service