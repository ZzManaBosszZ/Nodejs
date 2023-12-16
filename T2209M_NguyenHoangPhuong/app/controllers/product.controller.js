const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    // if (!req.body) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    // }
  
    // Create a Product
    const product = new Product({
        ProductCode: req.body.ProductCode,
        ProductName: req.body.ProductName,
        ProductDate: req.body.ProductDate,
        ProductOriginPrice: req.body.ProductOriginPrice, 
        Quantity: req.body.Quantity,
        ProductStoreCode: req.body.ProductStoreCode 
    });
  
    // Save Tutorial in the database
    Product.create(product, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.send(data);
    });
  };

// Retrieve all Tutorials from the database (with condition).
// exports.findAll = (req, res) => {
//     const title = req.query.title;
  
//     Tutorial.getAll(title,(err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       else res.send(data);
//     });
//   };

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    Product.findByCode(req.params.ProductCode, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with ProductCode ${req.params.ProductCode}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Product with ProductCode " + req.params.ProductCode
          });
        }
      } else res.send(data);
    });
  };

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Product.updateByCode(
      req.params.ProductCode,
      new Product(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Product with ProductCode ${req.params.ProductCode}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Product with ProductCode " + req.params.ProductCode
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Product.remove(req.params.ProductCode, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with ProductCode ${req.params.ProductCode}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Product with ProductCode " + req.params.ProductCode
          });
        }
      } else res.send({ message: `Product was deleted successfully!` });
    });
  };

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all product."
        });
      else res.send({ message: `All Products were deleted successfully!` });
    });
  };