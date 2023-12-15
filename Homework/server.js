const express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var tutorialRouter = require('./routes/tutorial');

const app = express();
const port = 8080

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret : 'webslesson',
    resave : true,
    saveUninitialized : true
}));

app.use('/tutorials', tutorialRouter);

app.use(cookieParser());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})