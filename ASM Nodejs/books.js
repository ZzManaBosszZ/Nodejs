const express = require('express');
const exphbs = require('express-handlebars').engine;

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const books = [
    { name: 'The Fault In Our Stars ', image: '/img/fault.webp', message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam iusto laudantium impedit maxime culpa sunt', author: 'Author: John Green' },
    { name: 'Harry Potter Complete Collection', image: '/img/harry.webp', message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam iusto laudantium impedit maxime culpa sunt', author: 'Author: JK.Rowling' },
    { name: 'The Hobbit ', image: '/img/hobbit.webp', message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam iusto laudantium impedit maxime culpa sunt', author: 'Author: J.R.R Tolkien' },
    { name: 'The Lord of the Rings   ', image: '/img/ring.webp', message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam iusto laudantium impedit maxime culpa sunt', author: 'Author: J.R.R Tolkien' },
    { name: 'Sherlock Holmes ', image: '/img/sherlock.webp', message: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam iusto laudantium impedit maxime culpa sunt', author: 'Author: Sir Arthur Conan Doyle' },
];

app.get('/', (req, res) => {
    res.render('books', { books });
});

app.get('/contactus', (req, res) => {
    res.render('contactus')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});