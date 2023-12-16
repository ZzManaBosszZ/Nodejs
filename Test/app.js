const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product_nodejs'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// REST API for inserting and deleting products
app.post('/api/products', (req, res) => {
  const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;

  const sql = 'INSERT INTO ProductCollection (ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting product: ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true });
    }
  });
});

app.delete('/api/products/:ProductCode', (req, res) => {
  const ProductCode = req.params.ProductCode;

  const sql = 'DELETE FROM ProductCollection WHERE ProductCode = ?';

  connection.query(sql, [ProductCode], (err, result) => {
    if (err) {
      console.error('Error deleting product: ' + err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true });
    }
  });
});

// Webpage to display all products
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM ProductCollection ORDER BY ProductCode DESC';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching products: ' + err.stack);
      res.status(500).send('Internal Server Error');
    } else {
      res.render('index', { products: results });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
