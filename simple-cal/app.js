const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./views/index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('./views/index.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                let result = eval(userInfo.a + userInfo.cal + userInfo.b)
                datahtml = datahtml.replace( '<p style="display: none" id="result">KQ: {result}</p>', ` <p style="display: block" id="result">KQ: ${result}</p>`);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(datahtml);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});
server.listen(8000, function () {
    console.log('server running at localhost:8000')
});