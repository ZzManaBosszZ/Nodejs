const db = require('../config/dbConfig');

class Product {
  static insertProduct(productData, callback) {
    const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = productData;
    const query = 'INSERT INTO ProductCollection (ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode], callback);
  }

  static deleteProduct(productCode, callback) {
    const query = 'DELETE FROM ProductCollection WHERE ProductCode = ?';
    db.query(query, [productCode], callback);
  }

  static getAllProducts(callback) {
    const query = 'SELECT * FROM ProductCollection ORDER BY ProductStoreCode DESC';
    db.query(query, callback);
  }
}

module.exports = Product;
