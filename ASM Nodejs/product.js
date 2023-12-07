const express = require('express');
const exphbs = require('express-handlebars').engine;

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const products = [
    { name: 'Product 1', image: '/img/product1.jpeg' },
    { name: 'Product 2', image: '/img/product2.jpeg' },
];

app.get('/', (req, res) => {
    res.render('products', { products });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});