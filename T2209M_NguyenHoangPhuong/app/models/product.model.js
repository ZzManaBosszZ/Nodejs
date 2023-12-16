const sql = require("./db.js");

// constructor
const Product = function (product) {
    this.ProductCode = product.ProductCode;
    this.ProductName = product.ProductName;
    this.ProductDate = product.ProductDate;
    this.ProductOriginPrice = product.ProductOriginPrice;
    this.Quantity = product.Quantity;
    this.ProductStoreCode = product.ProductStoreCode;
};

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO productcollection SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created productcollection: ", { id: res.insertId, ...newProduct });
        result(null, { id: res.insertId, ...newProduct });
    });
};

Product.getAll = (ProductName, result) => {
    let query = "SELECT * FROM productcollection";

    if (ProductName) {
        query += ` WHERE ProductName LIKE '%${ProductName}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Product: ", res);
        result(null, res);
    });
};

Product.updateByCode = (ProductCode, product, result) => {
    sql.query(
        "UPDATE productcollection SET ProductName = ?, ProductDate = ?, ProductOriginPrice = ?, Quantity = ?, ProductStoreCode = ?, WHERE ProductCode = ?",
        [product.ProductName, product.ProductDate, product.ProductOriginPrice, product.Quantity, product.ProductStoreCode, ProductCode],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated product: ", { id: id, ...product });
            result(null, { id: id, ...product });
        }
    );
};

Product.remove = (ProductCode, result) => {
    sql.query("DELETE FROM ProductCollection WHERE ProductCode = ?", ProductCode, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted ProductCollection with ProductCode: ", ProductCode);
        result(null, res);
    });
};

Product.removeAll = result => {
    sql.query("DELETE FROM ProductCollection", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} ProductCollection`);
        result(null, res);
    });
};

module.exports = Product;