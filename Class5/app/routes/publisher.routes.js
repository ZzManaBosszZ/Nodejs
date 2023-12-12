module.exports = app => {
    const publishers = require("../controllers/publisher.controller");
    var router = require("express").Router();
  
    router.post("/", publishers.create);
  
    router.get("/", publishers.findAll);

    app.use('/api/publishers', router);
}