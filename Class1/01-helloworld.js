const http = require('http')
const port = proccess.env.PORT((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch(path){
        case '':
            res.writeHead(200, { 'Content-Type': 'text/plain'})
            res.end('Homepage')
            break
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain'})
            res.end('About')
            break
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain'})
            res.end('Not Found')
            break
    }
})

Server.listen(port, () => console.log(`server started on port ${port}; ` + 'press Ctrl-C to terminate....'))