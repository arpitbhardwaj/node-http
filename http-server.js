const http = require('http');

const port = 8080
const server = http.createServer((req,res) => {
    res.end('Hello Http\n');
});

server.listen(port, () => {
    console.log(`Http Server is listening on port ${port}`);
})