const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB();
const resp = require('./lib/response.js');

module.exports.main = function(event, context, callback) {
    var params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            apiId: {
                S: event.pathParameters.id,
            },
            ownerId: {
                S: event.requestContext.authorizer.claims.sub
            }
        }
    };
    dynamoDb.getItem(params, function(err, data) {
        if (err) {
            callback(null, resp.failure({error: err, dump: params, event: event}));
        } else {
            callback(null, resp.success(data.Item));
        }
    });

    // callback(null, resp.success(event));
};