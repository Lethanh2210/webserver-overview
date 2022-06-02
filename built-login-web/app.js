const http = require('http');

http.createServer(function (req, res) {
    let txt = ""
    if(req.url === "/login") {
        txt = "Lonin success";
    } else {
        txt = "Login fail";
    }
    res.end(txt);
}).listen(8080, "localhost");