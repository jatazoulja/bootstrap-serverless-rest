const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const resp = require('./lib/response.js');

module.exports.main = function(event, context, callback) {
    var params = {
        TableName: process.env.DYNAMODB_TABLE,
        Limit:10
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
       /* Key: {
            ownerId: event.requestContext.identity.cognitoIdentityId,
        }*/
    };
    dynamoDb.scan(params, function(err, data) {
        if (err) {
            callback(null, resp.failure(err));
        } else {
            callback(null, resp.success(data));
        }
    });

//   callback(null, resp.success(event));
};
