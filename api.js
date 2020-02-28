var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

module.exports = {
    ping: function (req, res) {
        elasticClient.ping({
            requestTimeout: 30000
        }, function (error) {
            if (error) {
                res.status(500);
                return res.json({
                    status: false,
                    msg: 'Elasticsearch cluster is down!'
                })
            } else {
                res.status(200);
                return res.json({
                    status: true,
                    msg: 'Success! Elasticsearch cluster is up!'
                });
            }
        });
    },
    initIndex: function (req, res, indexName) {
        elasticClient.indices.create({
            index: indexName
        }).then(function (resp) {
            res.status(200);
            return res.json(resp);
        }, function (err) {
            res.status(500);
            return res.json(err);
        });
    },
    initExists: function (req, res, indexName) {
        elasticClient.indices.exists({
            index: indexName
        }).then(function (resp) {
            res.status(200);
            return res.json(resp);
        }, function (err) {
            res.status(500);
            return res.json(err);
        });
    },
    initMapping: function (req, res, indexName, docType, payload) {
        elasticClient.indices.putMapping({
            index: indexName,
            type: docType,
            body: payload
        }).then(function (resp) {
            res.status(200);
            return res.json(resp);
        }, function (err) {
            res.status(500);
            return res.json(err);
        });
    },
    addDocument: function (req, res, indexName, _id, docType, payload) {
        elasticClient.indices.index({
            index: indexName,
            type: docType,
            id: _id,
            body: payload
        }).then(function (resp) {
            res.status(200);
            return res.json(resp);
        }, function (err) {
            res.status(500);
            return res.json(err);
        });
    },
    updateDocument: function (req, res, indexName, _id, docType, payload) {
        elasticClient.indices.update({
            index: indexName,
            type: docType,
            id: _id,
            body: payload
        }).then(function (resp) {
            res.status(200);
            return res.json(resp);
        }, function (err) {
            res.status(500);
            return res.json(err);
        });
    },
    search: function (req, res, indexName, docType, payload) {
        elasticClient.indices.search({
            index: indexName,
            type: docType,
            body: payload
        }).then(function (resp) {
            res.status(200);
            return res.json(resp);
        }, function (err) {
            res.status(500);
            return res.json(err);
        });
    },
    deleteDocument: function (req, res, indexName, _id, docType) {
        elasticClient.indices.delete({
            index: indexName,
            type: docType,
            id: _id,
        }).then(function (resp) {
            res.status(200);
            return res.json(resp);
        }, function (err) {
            res.status(500);
            return res.json(err);
        });
    },
    deleteAll: function (req, res) {
        elasticClient.indices.delete({
            index: '_all',
        }).then(function (resp) {
            res.status(200);
            return res.json(resp);
        }, function (err) {
            res.status(500);
            return res.json(err);
        });
    },
}