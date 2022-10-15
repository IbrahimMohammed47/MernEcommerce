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

// service.getProducts = (filters = {}) => {
//     return Product.find(filters);
// }
service.getProducts = (filters={}, page = 0) => {
    const perPage = 20;
    return Product.find(filters, null, {sort: {createdAt: 'desc'}, skip: page * perPage, limit: perPage})  
}

service.deleteProduct = (productId) => {
    return  Product.findByIdAndDelete(
        productId
      );
}

module.exports = service