const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const resp = require('./lib/response.js');

module.exports.main = function(event, context, callback) {
 callback(null, resp.success(event));
};