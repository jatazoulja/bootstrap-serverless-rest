'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const resp = require('./lib/response.js');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.main = function(event, context, callback) {
    callback(null, resp.success(event));
};