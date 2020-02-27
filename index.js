const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.log('elasticsearch cluster is donwn!');
    } else {
        console.log('Everything is OK');
    }
});

app.use(bodyParser.json()); // use bodyparse as middleware
app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, '')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.sendFile('home.html', {
        root: path.join(__dirname, '')
    });
});

app.get('/search', function (req, res) {
    let body = {
        size: 200,
        from: 0,
        query: {
            match: {
                name: req.query['q']
            }
        }
    }
    client.search({ index: 'scotch.io-tutorial', body: body, type: 'cities_list' }).then(results => {
        res.send(results.hits.hits);
    }).catch(err => {
        console.log(err);
        res.send([]);
    });
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
})