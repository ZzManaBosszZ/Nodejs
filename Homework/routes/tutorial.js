var express = require('express');
var router = express.Router();
var axios = require('axios');

var database = require('../config/database')

router.get('/tutorial', function(req, res) {
    axios({
        url: "http://localhost:8080/api/tutorials",
        method: "GET",
    })
        .then(response => {
            res.render('tutorials/tutorial', {
                title: 'Tutorial',
                data: response.data
            });

        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });

});

module.exports = router;
