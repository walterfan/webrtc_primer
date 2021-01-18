var fs = require("fs");
var https = require("https");
/*
# generate key by input password pass1234
openssl genrsa -des3 -out site.key 2048

# generate CSR(Certificate Signing Request) file
openssl req -new -key site.key -out site.csr

# remove password of key
mv site.key site.key.org
openssl rsa -in site.key.org -out site.key

# generate certificate file
openssl x509 -req -days 365 -in site.csr -signkey site.key -out final.crt
*/
var privateKey = fs.readFileSync('site.key').toString();
var certificate = fs.readFileSync('final.crt');

var options = {
    key: privateKey,
    cert: certificate
}

https.createServer(options, function(req, res) {
    res.writeHead(200);
    res.end("hello security world");
}).listen(8443);