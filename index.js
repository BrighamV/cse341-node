var http = require('http');

http.createServer(function (req, res) {
    res.write('heather valentine');
    res.end();
}).listen(3000);