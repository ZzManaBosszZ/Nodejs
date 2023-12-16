module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", products.create);
  
    // // Retrieve all Products
    // router.get("/", products.findAll);

    // Retrieve a single Products with id
    router.get("/:ProductCode", products.findOne);
  
    // Update a Products with id
    router.put("/:ProductCode", products.update);
  
    // Delete a Products with id
    router.delete("/:ProductCode", products.delete);
  
    // Delete all Products
    router.delete("/", products.deleteAll);
  
    app.use('/api/products', router);
  };