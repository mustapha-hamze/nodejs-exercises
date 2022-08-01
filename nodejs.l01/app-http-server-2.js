const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write("<h1>Hello Dear Mustapha</h1>")
        res.end();
    }
    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end();
    }
})

server.listen(3000)

console.log('listening on port 3000 ...')