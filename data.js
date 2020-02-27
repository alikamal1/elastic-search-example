const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: ['http://localhost:9200']
});

client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.log('Elasticsearch cluster is down!');
    } else {
        console.log('Everyting is OK');
    }
});

// client.indices.create({
//     index: 'scotch.io-tutorial'
// }, function (error, response, status) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('created a new index', response);
//     }
// });

// client.index({
//     index: 'scotch.io-tutorial',
//     id: '1',
//     type: 'cities_list',
//     body: {
//         "Key1": "Content for key one",
//         "Key2": "Content for key two",
//         "Key3": "Content for key three",
//     }
// }, function (error, response, status) {
//     console.log(response);
// });

// Load bulk of data
const cities = require('./cities.json');
var bulk = [];
cities.forEach(city => {
    bulk.push({
        index: {
            _index: "scotch.io-tutorial",
            _type: "cities_list",
        }
    });
    bulk.push(city);
});

client.bulk({ body: bulk }, function (error, response) {
    if (error) {
        console.log('Failed bulk operation', error);
    } else {
        console.log('Successfully imported %s', cities.length);
    }
});