let http = require('http');
let port = process.env.PORT || 3000;

http.createServer(function (req, res) {
    res.write('heather valentine');
    res.end();
}).listen(port);