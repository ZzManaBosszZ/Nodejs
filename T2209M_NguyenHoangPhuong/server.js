const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product_nodejs'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// REST API to add a new product
app.post('/api/products', (req, res) => {
  const productData = req.body;
  const query = 'INSERT INTO ProductCollection (ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode) VALUES (?, ?, ?, ?, ?, ?)';
  const productValues = [
    productData.ProductCode,
    productData.ProductName,
    productData.ProductDate,
    productData.ProductOriginPrice,
    productData.Quantity,
    productData.ProductStoreCode
  ];
  
  db.query(query, productValues, (err, result) => {
    if (err) {
      console.error('Error inserting product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Product added successfully' });
    }
  });
});






// REST API to delete a product
app.delete('/api/products/:productCode', (req, res) => {
  const productCode = req.params.productCode;
  const query = 'DELETE FROM ProductCollection WHERE ProductCode = ?';
  db.query(query, [productCode], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  });
});

// Display all products on the web page
app.get('/', (req, res) => {
  const query = 'SELECT * FROM ProductCollection ORDER BY ProductStoreCode DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.render('product', { products: results });
    }
  });
});

// REST API to add a new product
app.post('/add', (req, res) => {
  const productData = req.body;
  const query = 'INSERT INTO ProductCollection SET ?';
  db.query(query, productData, (err, result) => {
    if (err) {
      console.error('Error inserting product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.redirect('/');
    }
  });
});

// REST API to delete a product
app.get('/delete/:productCode', (req, res) => {
  const productCode = req.params.productCode;
  const query = 'DELETE FROM ProductCollection WHERE ProductCode = ?';
  db.query(query, [productCode], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.redirect('/');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
