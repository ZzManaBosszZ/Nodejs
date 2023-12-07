const express = require('express');
const { message } = require('statuses');
const exphbs = require('express-handlebars').engine;

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', message: 'Welcome to the website!'})
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us', message: 'Learn more about our company'})
});

app.use((req, res) => {
    res.status(404).render('404', {title: '404 Not Found'})
});

app.use((err, req, res, next) => {
    res.status(500).render('500', {title: '500 Internal Server Error'})
});

app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}`);
})