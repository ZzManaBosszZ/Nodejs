var express = require('express');
var router = express.Router();
var axios = require('axios');

var database = require('../config/database');

router.get('/', function(req, res) {
    //list user
    database.query('SELECT * FROM user', function(err, result) {
        if(err)
            console.log(err);

        res.render('tutorials/list', {
            title: 'Tutorial List',
            data: result
        });
    });

});

router.get('/tutorial', function(req, res) {
    //list user
    axios({
        url: "http://localhost:3000/api/tutorials",
        method: "GET",
    })
        .then(response => {
            //res.status(200).json(response.data);
            res.render('tutorials/tutorial', {
                title: 'Tutorial List',
                data: response.data
            });

        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });

});

// router.get('/add', function(req, res) {
//     res.render('users/add', {
//         title: 'Add New User',
//         name: '',
//         age: '',
//         email: ''
//     })
// });
//
// router.post('/add', function(req, res) {
//     var user = {
//         name: req.body.name,
//         age: req.body.age,
//         email: req.body.email
//     }
//
//     database.query('INSERT INTO user SET ?', user, function(err, result) {
//         if(err) {
//             console.log(err);
//         }  else {
//
//             //req.flash('success', 'Data added successfully!')
//
//             res.render('users/add', {
//                 title: 'Add New User',
//                 name: '',
//                 age: '',
//                 email: ''
//             });
//         }
//     })
// });

module.exports = router;

