var port = 9000;

require('http').createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(req.body);
}).listen(9000);

console.log('http://localhost:' + port);
