const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = function(event, context, callback) {
    var response = {
        statusCode: 200,
        message: 'Success',
        payload: event

    };
    callback(null, response)
};