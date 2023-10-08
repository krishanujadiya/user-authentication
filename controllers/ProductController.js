const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

const bodyParser = require('body-parser');

// Create Products
exports.store_products = async (req, res) => {
  const { name, description, price } = req.body;

  // Create a new product and save it to the database
  const newProduct = new Product({ name, description, price });
  newProduct.save(
    res.status(201).json({ message: 'Product created' })
  );
};

// Get Products
exports.get_products = async (req, res) => {
  // Retrieve all products from the database
  Product.find({})
  .then(docs => {
    console.log(docs)
    res.json( { docs });
})
.catch(err => console.log(err))
};

// Update Products
exports.update_products = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price } = req.body;

  // Update the product in the database
  Product.findOneAndUpdate( {_id: productId}, { name, description, price }, { new: true }) 
  .then(product => {
    res.json({ message: 'Product updated' })
  });
};

// Delete Products
exports.delete_products = async (req, res) => {
  const { productId } = req.params;

  // Delete the product from the database
  Product.findOneAndDelete({_id: productId})
  .then(json => {
    res.json({ message: 'Product deleted' });
  });
};