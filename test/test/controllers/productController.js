const express = require('express');
const Product = require('../models/productModel');

const router = express.Router();

router.post('/api/products', (req, res) => {
  const productData = req.body;
  Product.insertProduct(productData, (err, result) => {
    if (err) {
      console.error('Error inserting product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Product added successfully' });
    }
  });
});

router.delete('/api/products/:productCode', (req, res) => {
  const productCode = req.params.productCode;
  Product.deleteProduct(productCode, (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  });
});

router.get('/', (req, res) => {
  Product.getAllProducts((err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.render('index', { products: results });
    }
  });
});

module.exports = router;
