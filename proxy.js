var path = require('path'),
    express = require('express'),
    https = require('https'),
    fs = require('fs'),
    exphbs = require('express-handlebars'),
    iframeReplacement = require('node-iframe-replacement'),
    config = require('./config/config');

    options = {
        cert: fs.readFileSync('config/sert/server.crt'),
        key: fs.readFileSync('config/sert/server.key')
    };

function Server() {

    var app = express();

    app.use(iframeReplacement);
    app.engine('hbs', exphbs());
    app.set('views', path.resolve(__dirname, 'views'));
    app.set('view engine', 'hbs');

    app.get('/', function(req, res) {

        res.merge(config.proxy.view, {
            sourceUrl: config.proxy.url,
            sourcePlaceholder: config.proxy.cssPlace
        });
    });

    https.createServer(options, app).listen(config.proxy.port, () => {
        console.log('Server started. Visit https://localhost:' + config.proxy.port);
    });
}

module.exports = new Server();