const { text } = require('body-parser')
const express = require('express')
const expressHandlebars = require('express-handlebars').engine
const app = express()

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


const port = process.env.PORT || 3000
app.get('/', (req, res) => res.render('home'))

const fortunes = [
    "Conquer your fear or they will conquer you",
    "Conquer your fear or they will conquer you",
    "Conquer your fear or they will conquer you",
    "Conquer your fear or they will conquer you",
    "Conquer your fear or they will conquer you",
]

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', { fortune: randomFortune })
})

app.use((req, res) => {
    res.status(404)
    res.render('404')

})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')

})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port};` + `press Ctrl-C to terminate`
))